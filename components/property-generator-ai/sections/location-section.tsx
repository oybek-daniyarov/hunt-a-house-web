'use client';

import { EditSection } from '../components/edit-section';
import { usePropertyForm } from '../providers/property-form-provider';
import { usePropertyGenerator } from '../providers/property-generator-provider';
import LocationPreviewSection from './location-preview-section';

const EDITING_SECTION = 'location';

export function LocationSection() {
  const { form, isCurrentEditingSection, filters } = usePropertyForm();
  const { propertyData } = usePropertyGenerator();
  const isEditing = isCurrentEditingSection(EDITING_SECTION);

  return (
    <EditSection title="Location" editingSection={EDITING_SECTION}>
      {isEditing ? (
        <div className="space-y-4"></div>
      ) : (
        <LocationPreviewSection />
      )}
    </EditSection>
  );
}
