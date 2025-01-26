'use client';

import { UseFormReturn } from "react-hook-form";
import { type PropertyResponse } from "@/app/api/generate-property/schema";
import { EditSection } from "../ui/edit-section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { usePropertyForm } from "../property-form-provider";

interface PropertySectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

const PROPERTY_TYPES = {
  1: 'Apartment',
  2: 'Villa',
  3: 'Townhouse',
  4: 'Penthouse',
  5: 'Compound',
  6: 'Duplex',
} as const;

const ACTIVITY_TYPES = {
  1: 'Rent',
  2: 'Buy',
  3: 'Short Term',
  4: 'Commercial Rent',
  5: 'Commercial Buy',
} as const;

type PropertyType = keyof typeof PROPERTY_TYPES;
type ActivityType = keyof typeof ACTIVITY_TYPES;

function formatSize(min: number | null, max: number | null) {
  if (!min && !max) return 'Not specified';
  
  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(num);

  return [min && `${formatNumber(min)} sqft`, max && `${formatNumber(max)} sqft`]
    .filter(Boolean)
    .join(' - ');
}

const TITLE = 'Property Details';

export function PropertySection({
  form,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: PropertySectionProps) {
  const { handleSubmit } = usePropertyForm();

  const handleSave = async () => {
    const isValid = await handleSubmit();
    if (isValid) {
      onSave();
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="property.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select 
                onValueChange={value => field.onChange(Number(value))} 
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(PROPERTY_TYPES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="property.activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Type</FormLabel>
              <Select 
                onValueChange={value => field.onChange(Number(value))} 
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(ACTIVITY_TYPES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="property.size.min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Size (sqft)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Min size" 
                  {...field}
                  value={field.value?.toString() || ''}
                  onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="property.size.max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Size (sqft)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Max size" 
                  {...field}
                  value={field.value?.toString() || ''}
                  onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    const { getValue } = usePropertyForm();
    const type = getValue('property.type', 1);
    const activity = getValue('property.activity', 1);
    const size = getValue('property.size', { min: null, max: null });

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Type:</span>
          <span>
            {PROPERTY_TYPES[type as PropertyType] || 'Not specified'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Activity:</span>
          <span>
            {ACTIVITY_TYPES[activity as ActivityType] || 'Not specified'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Size:</span>
          <span>
            {formatSize(size.min, size.max)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <EditSection
      title={TITLE}
      isEditing={isEditing}
      isDisabled={isGenerating}
      onEdit={onEdit}
      onSave={handleSave}
      onCancel={onCancel}
    >
      {isEditing ? renderForm() : renderContent()}
    </EditSection>
  );
} 