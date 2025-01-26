'use client';

import { createContext, useContext } from "react";
import { usePropertyGenerator } from "./hooks/use-property-generator";
import { PropertyFormProvider } from "./property-form-provider";
import type { PropertyResponse } from "@/app/api/generate-property/schema";

type Step = 'describe' | 'loading' | 'review' | 'preview';

interface PropertyGeneratorContextValue {
  currentStep: Step;
  description: string;
  propertyData: PropertyResponse | null;
  isLoading: boolean;
  error: Error | undefined;
  setDescription: (description: string) => void;
  handleDescribeSubmit: () => void;
  handleReviewSubmit: () => void;
  handlePreviewBack: () => void;
  handleStartOver: () => void;
  handlePropertyDataChange: (data: PropertyResponse) => void;
  getStepIndicatorProps: () => {
    currentStep: Step;
    isLoading: boolean;
  };
}

const PropertyGeneratorContext = createContext<PropertyGeneratorContextValue | null>(null);

interface PropertyGeneratorProviderProps {
  children: React.ReactNode;
  handleGenerate: (data: PropertyResponse) => void;
}

export function PropertyGeneratorProvider({ children, handleGenerate }: PropertyGeneratorProviderProps) {
  const generatorState = usePropertyGenerator({ handleGenerate });

  return (
    <PropertyGeneratorContext.Provider value={generatorState}>
      <PropertyFormProvider 
        propertyData={generatorState.propertyData} 
        onPropertyDataChange={generatorState.handlePropertyDataChange}
      >
        {children}
      </PropertyFormProvider>
    </PropertyGeneratorContext.Provider>
  );
}

export function usePropertyGeneratorContext() {
  const context = useContext(PropertyGeneratorContext);
  if (!context) {
    throw new Error('usePropertyGeneratorContext must be used within a PropertyGeneratorProvider');
  }
  return context;
} 