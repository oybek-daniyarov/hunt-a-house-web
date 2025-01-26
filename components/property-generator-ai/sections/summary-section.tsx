'use client';

import SummaryPreviewSection from '@/components/property-generator-ai/sections/summary-preview-section';
import { InputField } from '@/components/ui/input-field';
import { MultipleSelectorField } from '@/components/ui/multiple-selector-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';

const TITLE = 'Summary';
const EDITING_SECTION = 'summary';

export function SummarySection() {
  const { isCurrentEditingSection, form } = usePropertyForm();
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  return (
    <EditSection title={TITLE} editingSection={EDITING_SECTION}>
      {isEditing ? (
        <>
          <InputField
            control={form.control}
            name="content.title"
            label="Title"
            placeholder="Enter title"
          />

          <TextareaField
            control={form.control}
            name="content.description"
            label="Description"
            placeholder="Enter description"
            className="min-h-[100px]"
          />

          <MultipleSelectorField
            control={form.control}
            name="content.tags"
            label="Tags"
            placeholder="Enter tags"
            defaultOptions={[]}
            creatable
          />
        </>
      ) : (
        <SummaryPreviewSection />
      )}
    </EditSection>
  );
}
