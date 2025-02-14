'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

export interface StepData {
  [key: string]: any;
}

export interface Step<T = StepData> {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  canGoBack?: boolean;
}

interface StepContextType<T = StepData> {
  currentStepIndex: number;
  steps: Step<T>[];
  currentStep: Step<T> | null;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepData: Partial<T>;
  goToNextStep: () => Promise<void>;
  goToPreviousStep: () => Promise<void>;
  goToStep: (index: number) => Promise<void>;
  updateStepData: (data: Partial<T>) => void;
  canGoBack: boolean;
  isLoading: boolean;
}

interface StepProviderProps<T = StepData> {
  children: React.ReactNode;
  steps: Step<T>[];
  initialData?: Partial<T>;
  onStepComplete?: (
    stepIndex: number,
    data: Partial<T>
  ) => void | Promise<void>;
  onNextStep?: (
    currentIndex: number,
    nextIndex: number,
    data: Partial<T>
  ) => void | Promise<void>;
  onPrevStep?: (
    currentIndex: number,
    prevIndex: number,
    data: Partial<T>
  ) => void | Promise<void>;
}

const StepContext = createContext<StepContextType<any> | undefined>(undefined);

export const useSteps = <T extends StepData>() => {
  const context = useContext(StepContext) as StepContextType<T> | undefined;
  if (!context) {
    throw new Error('useSteps must be used within a StepProvider');
  }
  return context;
};

export const StepProvider = <T extends StepData>({
  children,
  steps,
  initialData = {},
  onStepComplete,
  onNextStep,
  onPrevStep,
}: StepProviderProps<T>) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepData, setStepData] = useState<Partial<T>>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const updateStepData = useCallback((newData: Partial<T>) => {
    setStepData((prev) => ({ ...prev, ...newData }));
  }, []);

  const goToNextStep = useCallback(async () => {
    if (currentStepIndex < steps.length - 1) {
      setIsLoading(true);
      try {
        if (onStepComplete) {
          await onStepComplete(currentStepIndex, stepData);
        }
        if (onNextStep) {
          await onNextStep(currentStepIndex, currentStepIndex + 1, stepData);
        }
        setCurrentStepIndex((prev) => prev + 1);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentStepIndex, steps.length, stepData, onStepComplete, onNextStep]);

  const goToPreviousStep = useCallback(async () => {
    if (currentStepIndex > 0 && steps[currentStepIndex].canGoBack !== false) {
      setIsLoading(true);
      try {
        if (onPrevStep) {
          await onPrevStep(currentStepIndex, currentStepIndex - 1, stepData);
        }
        setCurrentStepIndex((prev) => prev - 1);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentStepIndex, steps, stepData, onPrevStep]);

  const goToStep = useCallback(
    async (index: number) => {
      if (
        index >= 0 &&
        index < steps.length &&
        (index < currentStepIndex ||
          steps[currentStepIndex].canGoBack !== false)
      ) {
        setIsLoading(true);
        try {
          if (index > currentStepIndex && onNextStep) {
            await onNextStep(currentStepIndex, index, stepData);
          } else if (index < currentStepIndex && onPrevStep) {
            await onPrevStep(currentStepIndex, index, stepData);
          }
          setCurrentStepIndex(index);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [currentStepIndex, steps, stepData, onNextStep, onPrevStep]
  );

  const value: StepContextType<T> = {
    currentStepIndex,
    steps,
    currentStep: steps[currentStepIndex] || null,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    stepData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    updateStepData,
    canGoBack: steps[currentStepIndex]?.canGoBack !== false,
    isLoading,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};
