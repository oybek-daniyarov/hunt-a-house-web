"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { type PropertyResponse } from "@/app/api/generate-property/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/app/api/generate-property/schema";
import { LocationSection } from "./sections/location-section";
import { PropertySection } from "./sections/property-section";
import { SpecificationsSection } from "./sections/specifications-section";
import { BudgetSection } from "./sections/budget-section";
import { SummarySection } from "./sections/summary-section";

// Mock data for areas and communities - replace with real data
const allAreas = [
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "Business Bay",
  "JBR",
  "DIFC",
  "Arabian Ranches",
  "Dubai Hills Estate",
];

// Update the communities type and data structure
type CommunityMap = {
  [key: string]: string[];
};

const allCommunities: CommunityMap = {
  "Dubai Marina": ["Marina Gate", "Marina Promenade", "Dubai Marina Walk"],
  "Downtown Dubai": ["Burj Khalifa", "Dubai Mall", "Old Town"],
  "Palm Jumeirah": ["Palm Jumeirah Trunk", "Palm Jumeirah Fronds", "Crescent"],
  "Business Bay": ["Executive Towers", "The Opus", "Bay Square"],
  "JBR": ["JBR Walk", "The Beach", "Rimal"],
  "DIFC": ["Gate Village", "Sky Gardens", "Index Tower"],
  "Arabian Ranches": ["Saheel", "Savannah", "Mirador"],
  "Dubai Hills Estate": ["Maple", "Sidra", "Hills Grove"],
};

interface ReviewStepProps {
  propertyData: PropertyResponse | null;
  handleNewDescription: () => void;
  handleSubmitClick: () => void;
  onPropertyDataChange?: (data: PropertyResponse) => void;
}

type EditingSection = 'location' | 'property' | 'specifications' | 'budget' | 'summary' | null;

export function ReviewStep({ 
  propertyData, 
  handleNewDescription, 
  handleSubmitClick,
  onPropertyDataChange 
}: ReviewStepProps) {
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [allAvailableAreas, setAllAvailableAreas] = useState<string[]>(allAreas);
  const [allAvailableCommunities, setAllAvailableCommunities] = useState<CommunityMap>(allCommunities);

  useEffect(() => {
    if (!propertyData) return;

    // Safely handle areas
    const currentAreas = propertyData.areas || [];
    const newAreas = currentAreas.filter(area => !allAvailableAreas.includes(area));
    
    if (newAreas.length > 0) {
      setAllAvailableAreas(prev => [...prev, ...newAreas]);
    }

    // Safely handle communities
    const newCommunityMap: CommunityMap = { ...allAvailableCommunities };
    
    // Initialize areas with empty arrays
    currentAreas.forEach(area => {
      if (!newCommunityMap[area]) {
        newCommunityMap[area] = [];
      }
    });

    // Safely handle communities
    const currentCommunities = propertyData.communities || [];
    currentCommunities.forEach(community => {
      const area = currentAreas.find(area => 
        newCommunityMap[area]?.includes(community) ||
        !Object.values(newCommunityMap).flat().includes(community)
      ) || currentAreas[0];

      if (area && !newCommunityMap[area]?.includes(community)) {
        newCommunityMap[area] = [...(newCommunityMap[area] || []), community];
      }
    });

    setAllAvailableCommunities(newCommunityMap);
    setSelectedAreas(currentAreas);
    setSelectedCommunities(currentCommunities);
  }, [propertyData]);

  const form = useForm<PropertyResponse>({
    resolver: zodResolver(propertySchema),
    values: propertyData || undefined,
    defaultValues: {
      areas: [],
      communities: [],
      emirate_name: '',
      property_type: 1,
      activity_type: 1,
      min_size: 1,
      max_size: 1,
      bedrooms: 1,
      bathrooms: 1,
      min_budget: 1,
      max_budget: 1,
      budget_frequency: null,
      description: ''
    }
  });

  const isGenerating = !propertyData?.description;

  const handleEdit = (section: EditingSection) => {
    setEditingSection(section);
  };

  const handleSave = async (section: EditingSection) => {
    try {
      const values = form.getValues();
      
      // Update the form data based on the section
      const updatedData = {
        ...propertyData,
        ...values,
      } as PropertyResponse;

      // For location section, update the selected areas and communities
      if (section === 'location') {
        updatedData.areas = selectedAreas || [];
        updatedData.communities = selectedCommunities || [];
      }

      // Convert string values to numbers for numeric fields
      if (section === 'property') {
        updatedData.property_type = values.property_type ? parseInt(values.property_type.toString()) : 1;
        updatedData.activity_type = values.activity_type ? parseInt(values.activity_type.toString()) : 1;
        updatedData.min_size = values.min_size ? Number(values.min_size) : 1;
        updatedData.max_size = values.max_size ? Number(values.max_size) : 1;
      }

      if (section === 'specifications') {
        updatedData.bedrooms = values.bedrooms ? Number(values.bedrooms) : 1;
        updatedData.bathrooms = values.bathrooms ? Number(values.bathrooms) : 1;
      }

      if (section === 'budget') {
        updatedData.min_budget = values.min_budget ? Number(values.min_budget) : 1;
        updatedData.max_budget = values.max_budget ? Number(values.max_budget) : 1;
        updatedData.budget_frequency = values.budget_frequency || null;
      }

      // Notify parent component of the changes
      onPropertyDataChange?.(updatedData);
      
      // Close the edit form
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold">Review & Edit Property Requirements</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewDescription}
            className="text-xs"
            disabled={isGenerating}
          >
            Start Over
          </Button>
          <Button
            size="sm"
            className="text-xs"
            onClick={handleSubmitClick}
            disabled={isGenerating}
          >
            Continue to Preview
          </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border/50 p-8 rounded-xl shadow-sm max-w-4xl mx-auto"
      >
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground pb-4 border-b">
            {isGenerating ? (
              "Generating property requirements..."
            ) : (
              <>
                Click the edit icons <Pen className="inline-block h-4 w-4 mx-1 opacity-50" /> to modify any section of your requirements. Your changes will be used to refine the property search.
              </>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <LocationSection
              form={form}
              isEditing={editingSection === 'location'}
              propertyData={propertyData}
              selectedAreas={selectedAreas}
              selectedCommunities={selectedCommunities}
              allAvailableAreas={allAvailableAreas}
              allAvailableCommunities={allAvailableCommunities}
              onAreasChange={setSelectedAreas}
              onCommunitiesChange={setSelectedCommunities}
              onEdit={() => handleEdit('location')}
              onSave={() => handleSave('location')}
              onCancel={() => setEditingSection(null)}
              isGenerating={isGenerating}
            />
            <PropertySection
              form={form}
              isEditing={editingSection === 'property'}
              propertyData={propertyData}
              onEdit={() => handleEdit('property')}
              onSave={() => handleSave('property')}
              onCancel={() => setEditingSection(null)}
              isGenerating={isGenerating}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SpecificationsSection
              form={form}
              isEditing={editingSection === 'specifications'}
              propertyData={propertyData}
              onEdit={() => handleEdit('specifications')}
              onSave={() => handleSave('specifications')}
              onCancel={() => setEditingSection(null)}
              isGenerating={isGenerating}
            />
            <BudgetSection
              form={form}
              isEditing={editingSection === 'budget'}
              propertyData={propertyData}
              onEdit={() => handleEdit('budget')}
              onSave={() => handleSave('budget')}
              onCancel={() => setEditingSection(null)}
              isGenerating={isGenerating}
            />
          </div>

          <SummarySection
            form={form}
            isEditing={editingSection === 'summary'}
            propertyData={propertyData}
            onEdit={() => handleEdit('summary')}
            onSave={() => handleSave('summary')}
            onCancel={() => setEditingSection(null)}
            isGenerating={isGenerating}
          />
        </div>
      </motion.div>
    </div>
  );
} 