"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pen, Loader2 } from "lucide-react";
import { type PropertyResponse } from "@/app/api/generate-property/schema";
import { LocationSection } from "./sections/location-section";
import { PropertySection } from "./sections/property-section";
import { SpecificationsSection } from "./sections/specifications-section";
import { BudgetSection } from "./sections/budget-section";
import { SummarySection } from "./sections/summary-section";
import { usePropertyForm } from "./property-form-provider";
import { usePropertyGeneratorContext } from "./property-generator-provider";

interface ReviewStepProps {
  propertyData: PropertyResponse;
  handleNewDescription: () => void;
  handleSubmitClick: () => void;
}

type EditingSection = 'location' | 'property' | 'specifications' | 'budget' | 'summary' | null;

const LOADING_STEPS = [
  "Analyzing your requirements...",
  "Structuring property details...",
  "Finalizing property description..."
];

export function ReviewStep({ propertyData, handleNewDescription, handleSubmitClick }: ReviewStepProps) {
  const { form, getValue } = usePropertyForm();
  const { isLoading } = usePropertyGeneratorContext();
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentLoadingStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleEdit = (section: EditingSection) => {
    setEditingSection(section);
  };

  const handleSave = async (section: EditingSection) => {
    setEditingSection(null);
  };

  const handleCancel = (section: EditingSection) => {
    setEditingSection(null);
  };

  const isEditing = editingSection !== null;

  const renderSection = (section: EditingSection, title: string, content: React.ReactNode, editContent: React.ReactNode) => {
    const isCurrentlyEditing = editingSection === section;

    return (
      <div className="relative">
        {isCurrentlyEditing ? (
          editContent
        ) : (
          <div className="relative">
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {content}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(section)}
              className="absolute top-0 right-0"
              disabled={isEditing || isLoading}
            >
              <Pen className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderGeneratingState = () => (
    <motion.div 
      className="flex items-center justify-center gap-2 text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <motion.span
        key={currentLoadingStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {LOADING_STEPS[currentLoadingStep]}
      </motion.span>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mx-auto">
        <h2 className="text-lg font-semibold">Review & Edit Property Requirements</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewDescription}
            className="text-xs"
            disabled={isLoading || isEditing}
          >
            Start Over
          </Button>
          <Button
            size="sm"
            className="text-xs"
            onClick={handleSubmitClick}
            disabled={isLoading || isEditing}
          >
            Continue to Preview
          </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border/50 p-8 rounded-xl shadow-sm mx-auto"
      >
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground pb-4 border-b">
            {isLoading ? (
              renderGeneratingState()
            ) : isEditing ? (
              <div className="flex items-center gap-1.5">
                Please <Badge variant="outline" className="font-normal">save</Badge> or <Badge variant="outline" className="font-normal">cancel</Badge> your changes before proceeding.
              </div>
            ) : (
              <>
                Click the edit icons <Pen className="inline-block h-4 w-4 mx-1 opacity-50" /> to modify any section of your requirements. Your changes will be used to refine the property search.
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {renderSection(
              'location',
              'Location',
              <>
                <div>Emirate: {getValue('location.emirate', '')}</div>
                <div>Areas: {getValue('location.areas', []).join(', ')}</div>
                <div>Communities: {getValue('location.communities', []).join(', ')}</div>
              </>,
              <LocationSection
                form={form}
                propertyData={propertyData}
                isEditing={true}
                onEdit={() => handleEdit('location')}
                onSave={() => handleSave('location')}
                onCancel={() => handleCancel('location')}
                isGenerating={isLoading}
              />
            )}

            {renderSection(
              'property',
              'Property Details',
              <>
                <div>Type: {getValue('property.type', 1)}</div>
                <div>Activity: {getValue('property.activity', 1)}</div>
                <div>Size: {getValue('property.size.min', 0)} - {getValue('property.size.max', 0)} sqft</div>
              </>,
              <PropertySection
                form={form}
                propertyData={propertyData}
                isEditing={true}
                onEdit={() => handleEdit('property')}
                onSave={() => handleSave('property')}
                onCancel={() => handleCancel('property')}
                isGenerating={isLoading}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {renderSection(
              'specifications',
              'Specifications',
              <>
                <div>Bedrooms: {getValue('specifications.bedrooms', 0)}</div>
                <div>Bathrooms: {getValue('specifications.bathrooms', 0)}</div>
              </>,
              <SpecificationsSection
                form={form}
                propertyData={propertyData}
                isEditing={true}
                onEdit={() => handleEdit('specifications')}
                onSave={() => handleSave('specifications')}
                onCancel={() => handleCancel('specifications')}
                isGenerating={isLoading}
              />
            )}

            {renderSection(
              'budget',
              'Budget',
              <>
                <div>Min: {getValue('budget.min', 0)}</div>
                <div>Max: {getValue('budget.max', 0)}</div>
                <div>Frequency: {getValue('budget.frequency', 'monthly')}</div>
              </>,
              <BudgetSection
                form={form}
                propertyData={propertyData}
                isEditing={true}
                onEdit={() => handleEdit('budget')}
                onSave={() => handleSave('budget')}
                onCancel={() => handleCancel('budget')}
                isGenerating={isLoading}
              />
            )}
          </div>

          {renderSection(
            'summary',
            'Summary',
            <>
              <div>Title: {getValue('content.title', '')}</div>
              <div>Description: {getValue('content.description', '')}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {getValue('content.tags', []).map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </>,
            <SummarySection
              form={form}
              propertyData={propertyData}
              isEditing={true}
              onEdit={() => handleEdit('summary')}
              onSave={() => handleSave('summary')}
              onCancel={() => handleCancel('summary')}
              isGenerating={isLoading}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
} 