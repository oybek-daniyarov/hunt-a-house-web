'use client';

import { SelectField } from '@/components/ui/select-field';
import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';
import SpecificationsPreviewSection from './specifications-preview-section';

const TITLE = 'Specifications';
const EDITING_SECTION = 'specifications';

export function SpecificationsSection() {
  const { isCurrentEditingSection, form, filters } = usePropertyForm();
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  const bedroomsOptions = filters.bedrooms.map((bedroom) => ({
    label: bedroom.name,
    value: bedroom.id.toString(),
  }));

  const bathroomsOptions = filters.bathrooms.map((bathroom) => ({
    label: bathroom.name,
    value: bathroom.id.toString(),
  }));

  return (
    <EditSection title={TITLE} editingSection={EDITING_SECTION}>
      {isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            control={form.control}
            name="specifications.bedrooms"
            label="Bedrooms"
            placeholder="Select bedrooms"
            options={bedroomsOptions}
          />

          <SelectField
            control={form.control}
            name="specifications.bathrooms"
            label="Bathrooms"
            placeholder="Select bathrooms"
            options={bathroomsOptions}
          />
        </div>
      ) : (
        <SpecificationsPreviewSection />
      )}
    </EditSection>
  );
}
