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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/multiple-selector";
import { usePropertyForm } from "../property-form-provider";

interface Option {
  label: string;
  value: string;
}

const TITLE = 'Summary';

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
  const { handleSubmit } = usePropertyForm();

  const handleSave = async () => {
    const isValid = await handleSubmit();
    if (isValid) {
      onSave();
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="content.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter description" 
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content.tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <MultipleSelector
                placeholder="Enter tags"
                value={field.value?.map((tag: string) => ({ label: tag, value: tag })) || []}
                defaultOptions={[]}
                onChange={(values: Option[]) => {
                  field.onChange(values.map(v => v.value));
                }}
                className="w-full"
                creatable
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderContent = () => {
    const { getValue } = usePropertyForm();
    const content = getValue('content', {
      title: '',
      description: '',
      tags: []
    });
    const seo = getValue('seo', {
      title: '',
      description: ''
    });

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Content</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-medium">Title:</span>
              <span className="flex-1">{content.title || 'Not specified'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">Description:</span>
              <span className="flex-1 whitespace-pre-wrap">{content.description || 'Not specified'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">Tags:</span>
              <span className="flex-1">{content.tags?.length ? content.tags.join(', ') : 'Not specified'}</span>
            </div>
          </div>
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