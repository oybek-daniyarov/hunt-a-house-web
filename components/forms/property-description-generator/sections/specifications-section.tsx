'use client';

import { UseFormReturn } from "react-hook-form";
import { type PropertyResponse } from "@/app/api/generate-property/schema";
import { EditSection } from "../ui/edit-section";
import {
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
import { usePropertyForm } from "../property-form-provider";

interface SpecificationsSectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

const BEDROOMS = Array.from({ length: 6 }, (_, i) => i + 1);
const BATHROOMS = Array.from({ length: 6 }, (_, i) => i + 1);

const TITLE = 'Specifications';

export function SpecificationsSection({
  form,
  isEditing,
  propertyData,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: SpecificationsSectionProps) {
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
          name="specifications.bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BEDROOMS.map(value => (
                    <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specifications.bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BATHROOMS.map(value => (
                    <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    const { getValue } = usePropertyForm();
    const bedrooms = getValue('specifications.bedrooms', 1);
    const bathrooms = getValue('specifications.bathrooms', 1);

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Bedrooms:</span>
          <span>{bedrooms || 'Not specified'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Bathrooms:</span>
          <span>{bathrooms || 'Not specified'}</span>
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