'use client';

import { LocationSearchField } from '@/components/ui/location-search-field';
import { SelectField } from '@/components/ui/select-field';
import { searchLocations } from '@/lib/data/locations';
import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';
import { usePropertyGenerator } from '../providers/property-generator-provider';
import LocationPreviewSection from './location-preview-section';

const EDITING_SECTION = 'location';

export function LocationSection() {
  const { form, isCurrentEditingSection, filters } = usePropertyForm();
  const { propertyData } = usePropertyGenerator();
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  const emiratesOptions = filters.emirates.map((emirate) => ({
    label: emirate.name,
    value: emirate.id.toString(),
  }));

  const defaultLocations = propertyData?.location.materializedPath
    ? [
        {
          value: propertyData.location.materializedPath,
          label: propertyData.location.communityName,
        },
      ]
    : [];
  return (
    <EditSection title="Location" editingSection={EDITING_SECTION}>
      {isEditing ? (
        <div className="space-y-4">
          <SelectField
            name="location.emirateId"
            control={form.control}
            label="Emirate"
            placeholder="Select emirate"
            options={emiratesOptions}
          />
          <LocationSearchField
            name="location.materializedPath"
            control={form.control}
            label="Location"
            placeholder="Search for a location..."
            onSearch={searchLocations}
            defaultLocations={defaultLocations}
          />
        </div>
      ) : (
        <LocationPreviewSection />
      )}
    </EditSection>
  );
}
