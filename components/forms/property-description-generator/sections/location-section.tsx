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
import MultipleSelector from "@/components/ui/multiple-selector";
import { usePropertyForm } from "../property-form-provider";

// Initial data structure for areas and communities
const INITIAL_AREAS = [
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "Business Bay",
  "JBR",
  "DIFC",
  "Arabian Ranches",
  "Dubai Hills Estate",
] as const;

type Area = typeof INITIAL_AREAS[number];

const INITIAL_COMMUNITIES: Record<Area, string[]> = {
  "Dubai Marina": ["Marina Gate", "Marina Promenade", "Dubai Marina Walk"],
  "Downtown Dubai": ["Burj Khalifa", "Dubai Mall", "Old Town"],
  "Palm Jumeirah": ["Palm Jumeirah Trunk", "Palm Jumeirah Fronds", "Crescent"],
  "Business Bay": ["Executive Towers", "The Opus", "Bay Square"],
  "JBR": ["JBR Walk", "The Beach", "Rimal"],
  "DIFC": ["Gate Village", "Sky Gardens", "Index Tower"],
  "Arabian Ranches": ["Saheel", "Savannah", "Mirador"],
  "Dubai Hills Estate": ["Maple", "Sidra", "Hills Grove"],
};

interface Option {
  label: string;
  value: string;
}

interface LocationSectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

const TITLE = "Location";

export function LocationSection({
  form,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: LocationSectionProps) {
  const { handleSubmit } = usePropertyForm();
  const selectedAreas = form.watch('location.areas') || [];

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
        name="location.emirate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emirate</FormLabel>
            <FormControl>
              <Input placeholder="Enter emirate" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location.areas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Areas</FormLabel>
            <FormControl>
              <MultipleSelector
                placeholder="Select areas"
                value={field.value?.map((area: string) => ({ label: area, value: area })) || []}
                defaultOptions={[...INITIAL_AREAS].map((area) => ({
                  label: area,
                  value: area
                }))}
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

      <FormField
        control={form.control}
        name="location.communities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Communities</FormLabel>
            <FormControl>
              <MultipleSelector
                placeholder="Select communities"
                value={field.value?.map((community: string) => ({ label: community, value: community })) || []}
                defaultOptions={selectedAreas.flatMap((area) => 
                  (INITIAL_COMMUNITIES[area as Area] || []).map((community) => ({
                    label: community,
                    value: community
                  }))
                )}
                onChange={(values: Option[]) => {
                  field.onChange(values.map(v => v.value));
                }}
                className="w-full"
                creatable
                emptyIndicator={selectedAreas.length === 0 ? "Please select an area first" : "No communities found"}
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
    const emirate = getValue('location.emirate', '');
    const areas = getValue('location.areas', []);
    const communities = getValue('location.communities', []);

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Emirate:</span>
          <span>{emirate || 'Not specified'}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-medium">Areas:</span>
          <span className="flex-1">
            {areas.length ? areas.join(', ') : 'Not specified'}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-medium">Communities:</span>
          <span className="flex-1">
            {communities.length ? communities.join(', ') : 'Not specified'}
          </span>
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