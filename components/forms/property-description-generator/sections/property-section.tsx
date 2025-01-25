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

const propertyTypes = {
  1: 'Apartment',
  2: 'Villa',
  3: 'Townhouse'
} as const;

const activityTypes = {
  1: 'Buy',
  2: 'Rent Long Term',
  3: 'Rent Short Term'
} as const;

function formatSize(min: number | null, max: number | null) {
  if (!min && !max) return 'Not specified';
  
  const formatNumber = (num: number) => `${num.toLocaleString()} sqft`;
  
  return [min && formatNumber(min), max && formatNumber(max)]
    .filter(Boolean)
    .join(' - ');
}

interface PropertySectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

export function PropertySection({
  form,
  isEditing,
  propertyData,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: PropertySectionProps) {
  const renderForm = () => (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="property_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(propertyTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activity_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(activityTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="min_size"
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
            name="max_size"
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
      </form>
    </Form>
  );

  const renderContent = () => (
    <>
      <p className="text-sm text-muted-foreground mb-1">
        Type: {propertyData?.property_type ? propertyTypes[propertyData.property_type as keyof typeof propertyTypes] : 'Not specified'}
      </p>
      <p className="text-sm text-muted-foreground mb-1">
        Activity: {propertyData?.activity_type ? activityTypes[propertyData.activity_type as keyof typeof activityTypes] : 'Not specified'}
      </p>
      <p className="text-sm text-muted-foreground">
        Size: {formatSize(propertyData?.min_size || null, propertyData?.max_size || null)}
      </p>
    </>
  );

  return (
    <EditSection
      title="Property Details"
      isEditing={isEditing}
      isDisabled={isGenerating}
      onEdit={onEdit}
      onSave={onSave}
      onCancel={onCancel}
    >
      {isEditing ? renderForm() : renderContent()}
    </EditSection>
  );
} 