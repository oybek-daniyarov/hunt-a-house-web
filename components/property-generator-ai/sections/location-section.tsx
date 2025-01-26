'use client';

import { MultipleSelectorField } from '@/components/ui/multiple-selector-field';
import { SelectField } from '@/components/ui/select-field';
import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';
import LocationPreviewSection from './location-preview-section';

const TITLE = 'Location';
const EDITING_SECTION = 'location';

export function LocationSection() {
  const { form, isCurrentEditingSection, filters } = usePropertyForm();
  const emiratesOptions = filters.emirates.map((emirate) => ({
    label: emirate.name,
    value: emirate.id.toString(),
  }));

  const areasOptions = filters.cities.map((city) => ({
    label: city.name,
    value: city.id.toString(),
  }));

  const communitiesOptions = filters.areas.map((area) => ({
    label: area.name,
    value: area.id.toString(),
  }));

  const selectedAreas = form.watch('location.areas') || [];
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  return (
    <EditSection title={TITLE} editingSection={EDITING_SECTION}>
      {isEditing ? (
        <div className="space-y-4">
          <SelectField
            control={form.control}
            name="location.emirate"
            label="Emirate"
            placeholder="Select emirate"
            options={emiratesOptions}
          />

          <MultipleSelectorField
            control={form.control}
            name="location.areas"
            label="Areas"
            placeholder="Select areas"
            defaultOptions={areasOptions}
            creatable
          />

          <MultipleSelectorField
            control={form.control}
            name="location.communities"
            label="Communities"
            placeholder="Select communities"
            defaultOptions={communitiesOptions}
            creatable
            emptyIndicator={
              selectedAreas.length === 0
                ? 'Please select an area first'
                : 'No communities found'
            }
          />
        </div>
      ) : (
        <LocationPreviewSection />
      )}
    </EditSection>
  );
}
