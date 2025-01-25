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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multiple-selector";

interface LocationSectionProps {
  form: UseFormReturn<PropertyResponse>;
  isEditing: boolean;
  propertyData: PropertyResponse | null;
  selectedAreas: string[];
  selectedCommunities: string[];
  allAvailableAreas: string[];
  allAvailableCommunities: { [key: string]: string[] };
  onAreasChange: (areas: string[]) => void;
  onCommunitiesChange: (communities: string[]) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

export function LocationSection({
  form,
  isEditing,
  propertyData,
  selectedAreas,
  selectedCommunities,
  allAvailableAreas,
  allAvailableCommunities,
  onAreasChange,
  onCommunitiesChange,
  onEdit,
  onSave,
  onCancel,
  isGenerating
}: LocationSectionProps) {
  const renderForm = () => (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="emirate_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emirate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emirate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Dubai">Dubai</SelectItem>
                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="Sharjah">Sharjah</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col">
          <FormLabel>Areas</FormLabel>
          <MultipleSelector
            value={selectedAreas.map(area => ({ value: area, label: area }))}
            defaultOptions={allAvailableAreas.map(area => ({ value: area, label: area }))}
            placeholder="Select areas"
            onChange={(options) => {
              onAreasChange(options.map(opt => opt.value));
            }}
            creatable
          />
        </FormItem>

        <FormItem className="flex flex-col">
          <FormLabel>Communities</FormLabel>
          <MultipleSelector
            value={selectedCommunities.map(community => ({ value: community, label: community }))}
            defaultOptions={selectedAreas.flatMap(area => 
              (allAvailableCommunities[area] || []).map(community => ({
                value: community,
                label: community
              }))
            )}
            placeholder="Select communities"
            onChange={(options) => {
              onCommunitiesChange(options.map(opt => opt.value));
            }}
            emptyIndicator={selectedAreas.length === 0 ? "Please select an area first" : "No communities found"}
            creatable
          />
        </FormItem>
      </form>
    </Form>
  );

  const renderContent = () => (
    <>
      <p className="text-sm text-muted-foreground mb-1">Emirate: {propertyData?.emirate_name || 'Not specified'}</p>
      {propertyData?.areas && Array.isArray(propertyData.areas) && propertyData.areas.length > 0 && (
        <p className="text-sm text-muted-foreground mb-1">
          Areas: {propertyData.areas.join(', ')}
        </p>
      )}
      {propertyData?.communities && Array.isArray(propertyData.communities) && propertyData.communities.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Communities: {propertyData.communities.join(', ')}
        </p>
      )}
    </>
  );

  return (
    <EditSection
      title="Location"
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