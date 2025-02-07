'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { z } from 'zod';

import { propertySchema } from '@/components/property-generator-ai/schema';
import { StepType } from '@/components/property-generator-ai/types';
import {
  LocationSearchResponse,
  LocationSearchResponseSchema,
} from '@/lib/ai/types';

type PropertyResponse = z.infer<typeof propertySchema>;

interface PropertyGeneratorContextValue {
  currentStep: StepType;
  description: string;
  propertyData: LocationSearchResponse | null;
  isLoading: boolean;
  error: Error | undefined;
  hasPartialData: boolean;
  setDescription: (description: string) => void;
  handleDescribeSubmit: () => void;
  handleReviewSubmit: () => void;
  handlePreviewBack: () => void;
  handleStartOver: () => void;
  handlePropertyDataChange: (data: LocationSearchResponse) => void;
  getStepIndicatorProps: () => {
    showResults: boolean;
    hasPartialData: boolean;
    isPreviewStep: boolean;
  };
}

const PropertyGeneratorContext =
  createContext<PropertyGeneratorContextValue | null>(null);

interface PropertyGeneratorProviderProps {
  children: React.ReactNode;
}

export function PropertyGeneratorProvider({
  children,
}: PropertyGeneratorProviderProps) {
  const handleGenerate = useCallback((data: LocationSearchResponse) => {
    console.log('Generated work request:', data);
  }, []);

  // State
  const [description, setDescription] = useState('');
  const [currentStep, setCurrentStep] = useState<StepType>('describe');

  const {
    object: propertyData,
    submit,
    isLoading,
    error,
  } = useObject<LocationSearchResponse>({
    api: '/api/property',
    schema: LocationSearchResponseSchema,
  });

  const hasPartialData = Boolean(
    propertyData && Object.keys(propertyData).length > 0
  );

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
      await submit({ query: description });
    } catch (error) {
      console.error('Error generating property requirements:', error);
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
    setDescription('');
    setCurrentStep('describe');
  };

  const handlePropertyDataChange = (data: LocationSearchResponse) => {
    handleGenerate(data);
  };

  const getStepIndicatorProps = () => {
    const showResults = currentStep !== 'describe';
    const isPreviewStep = currentStep === 'preview';
    const showLoading =
      currentStep === 'loading' || (showResults && !hasPartialData);

    return {
      showResults,
      hasPartialData: showLoading ? false : hasPartialData,
      isPreviewStep,
    };
  };

  const value: PropertyGeneratorContextValue = {
    currentStep,
    description,
    propertyData,
    isLoading,
    error,
    hasPartialData,
    setDescription,
    handleDescribeSubmit,
    handleReviewSubmit,
    handlePreviewBack,
    handleStartOver,
    handlePropertyDataChange,
    getStepIndicatorProps,
  };

  return (
    <PropertyGeneratorContext.Provider value={value}>
      {children}
    </PropertyGeneratorContext.Provider>
  );
}

export function usePropertyGenerator() {
  const context = useContext(PropertyGeneratorContext);
  if (!context) {
    throw new Error(
      'usePropertyGeneratorContext must be used within a PropertyGeneratorProvider'
    );
  }
  return context;
}
