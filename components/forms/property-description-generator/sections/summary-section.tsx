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
import { Textarea } from "@/components/ui/textarea";

interface SummarySectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

export function SummarySection({
  form,
  isEditing,
  propertyData,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: SummarySectionProps) {
  const renderForm = () => (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter property description" 
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const renderContent = () => (
    <p className="text-sm text-muted-foreground leading-relaxed">
      {propertyData?.description || 'Generating description...'}
    </p>
  );

  return (
    <EditSection
      title="Summary"
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