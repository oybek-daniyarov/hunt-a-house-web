'use client';

import PropertyPreviewSection from '@/components/property-generator-ai/sections/property-preview-section';
import { InputField } from '@/components/ui/input-field';
import { SelectField } from '@/components/ui/select-field';
import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';

const TITLE = 'Property Details';
const EDITING_SECTION = 'property';

export function PropertySection() {
  const { isCurrentEditingSection, form, filters } = usePropertyForm();
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  const propertyTypeOptions = filters.propertyTypes.map((type) => ({
    label: type.name,
    value: type.id.toString(),
  }));

  const activityTypeOptions = filters.activityTypes.map((type) => ({
    label: type.name,
    value: type.id.toString(),
  }));

  return (
    <EditSection title={TITLE} editingSection={EDITING_SECTION}>
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              control={form.control}
              name="property.type"
              label="Property Type"
              placeholder="Select property type"
              options={propertyTypeOptions}
            />

            <SelectField
              control={form.control}
              name="property.activity"
              label="Activity Type"
              placeholder="Select activity type"
              options={activityTypeOptions}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              control={form.control}
              name="property.size.min"
              label="Minimum Size (sqft)"
              type="number"
              placeholder="Min size"
              parseValue={(value) => (value ? parseInt(value) : null)}
            />

            <InputField
              control={form.control}
              name="property.size.max"
              label="Maximum Size (sqft)"
              type="number"
              placeholder="Max size"
              parseValue={(value) => (value ? parseInt(value) : null)}
            />
          </div>
        </>
      ) : (
        <PropertyPreviewSection />
      )}
    </EditSection>
  );
}
