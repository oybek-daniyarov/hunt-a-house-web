'use client';

import { type ReactNode } from 'react';
import { Pen } from 'lucide-react';

import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';
import { EditingSectionType } from '@/components/property-generator-ai/types';
import { Button } from '@/components/ui/button';
import { usePropertyForm } from '../providers/property-form-provider';

interface EditSectionProps {
  title: string;
  children: ReactNode;
  editingSection: EditingSectionType;
}

export function EditSection({
  title,
  editingSection,
  children,
}: EditSectionProps) {
  const { form, isEditing, handleSectionStepChange } = usePropertyForm();
  const { isLoading } = usePropertyGenerator();
  const { isCurrentEditingSection } = usePropertyForm();
  const isCurrentEditing = isCurrentEditingSection(editingSection);

  const handleCancel = async () => {
    const isValid = await form.trigger();

    isValid && handleSectionStepChange(null);
  };

  const isDisabled = isLoading || isEditing;

  const handleEdit = () => {
    handleSectionStepChange(editingSection);
  };

  const handleSave = async () => {
    const isValid = await form.trigger();
    isValid && handleSectionStepChange(null);
  };

  const renderEditButtons = () => {
    if (isCurrentEditing) {
      return (
        <>
          <Button
            variant="destructive"
            size="xs"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" size="xs" onClick={handleSave}>
            Save
          </Button>
        </>
      );
    }

    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 opacity-70 hover:opacity-100 disabled:opacity-30"
        onClick={handleEdit}
        disabled={isDisabled}
      >
        <Pen className="h-4 w-4" />
        <span className="sr-only">Edit {title}</span>
      </Button>
    );
  };

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 flex items-center gap-1">
        {renderEditButtons()}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
