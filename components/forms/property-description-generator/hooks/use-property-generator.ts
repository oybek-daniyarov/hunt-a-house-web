'use client';

import { useState, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { propertySchema } from "@/app/api/generate-property/schema";
import type { z } from "zod";

type PropertyResponse = z.infer<typeof propertySchema>;
type Step = 'describe' | 'loading' | 'review' | 'preview';

interface UsePropertyGeneratorProps {
  handleGenerate: (data: PropertyResponse) => void;
}

export function usePropertyGenerator({ handleGenerate }: UsePropertyGeneratorProps) {
  // State
  const [description, setDescription] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>('describe');
  
  // AI Object
  const { 
    object: partialData, 
    submit, 
    isLoading, 
    error 
  } = useObject<PropertyResponse>({
    api: "/api/generate-property",
    schema: propertySchema,
  });

  const propertyData = partialData as PropertyResponse | null;
  const hasPartialData = Boolean(propertyData && Object.keys(propertyData).length > 0);

  // Effects
  useEffect(() => {
    if (propertyData && Object.keys(propertyData).length > 0) {
      handleGenerate(propertyData);
      // Move to review step as soon as we get data
      if (currentStep === 'loading') {
        setCurrentStep('review');
      }
    }
  }, [propertyData, handleGenerate, currentStep]);

  // Handlers
  const handleDescribeSubmit = async () => {
    if (isLoading || !description.trim()) return;
    
    try {
      setCurrentStep('loading');
      await submit({ description });
    } catch (error) {
      console.error("Error generating property requirements:", error);
      setCurrentStep('describe');
    }
  };

  const handleReviewSubmit = () => {
    setCurrentStep('preview');
  };

  const handlePreviewBack = () => {
    setCurrentStep('review');
  };

  const handleStartOver = () => {
    setDescription("");
    setCurrentStep('describe');
  };

  const handlePropertyDataChange = (data: PropertyResponse) => {
    handleGenerate(data);
  };

  const getStepIndicatorProps = () => {
    const showResults = currentStep !== 'describe';
    const isPreviewStep = currentStep === 'preview';
    const showLoading = currentStep === 'loading' || (showResults && !hasPartialData);

    return {
      showResults,
      hasPartialData: showLoading ? false : hasPartialData,
      isPreviewStep,
    };
  };

  return {
    // State
    currentStep,
    description,
    propertyData,
    isLoading,
    error,
    hasPartialData,

    // Actions
    setDescription,
    handleDescribeSubmit,
    handleReviewSubmit,
    handlePreviewBack,
    handleStartOver,
    handlePropertyDataChange,
    getStepIndicatorProps,
  };
} 