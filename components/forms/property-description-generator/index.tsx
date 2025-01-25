"use client";

import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { propertySchema } from "@/app/api/generate-property/schema";
import type { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { StepIndicator } from "./step-indicator";
import { DescribeStep } from "./describe-step";
import { ReviewStep } from "./review-step";
import { PreviewStep } from "./preview-step";
import { LoadingState } from "./loading-state";

type PropertyResponse = z.infer<typeof propertySchema>;

type Step = 'describe' | 'loading' | 'review' | 'preview';

interface PropertyDescriptionGeneratorProps {
  handleGenerate: (data: PropertyResponse) => void;
}

const stepVariants = {
  enter: {
    y: 20,
    opacity: 0,
    scale: 0.98
  },
  center: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: {
    y: -20,
    opacity: 0,
    scale: 0.98
  }
};

const stepTransition = {
  duration: 0.35,
  ease: [0.32, 0.72, 0, 1]
};

export function PropertyDescriptionGenerator({ handleGenerate }: PropertyDescriptionGeneratorProps) {
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

  const handleFinalSubmit = () => {
    if (!propertyData) return;
    // Handle final submission
    console.log("Final submission:", propertyData);
  };

  // Render helpers
  const renderStep = () => {
    switch (currentStep) {
      case 'describe':
        return (
          <motion.div
            key="describe"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
            className="w-full mt-4"
          >
            <DescribeStep
              description={description}
              setDescription={setDescription}
              handleSubmit={handleDescribeSubmit}
              isLoading={isLoading}
            />
          </motion.div>
        );
      case 'loading':
        return (
          <motion.div
            key="loading"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
            className="w-full"
          >
            <LoadingState />
          </motion.div>
        );
      case 'review':
        if (!propertyData) {
          setCurrentStep('loading');
          return (
            <motion.div
              key="loading-fallback"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="w-full"
            >
              <LoadingState />
            </motion.div>
          );
        }
        return (
          <motion.div
            key="review"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
            className="w-full"
          >
            <ReviewStep
              propertyData={propertyData}
              handleNewDescription={handleStartOver}
              handleSubmitClick={handleReviewSubmit}
              onPropertyDataChange={handleGenerate}
            />
          </motion.div>
        );
      case 'preview':
        if (!propertyData) {
          setCurrentStep('loading');
          return (
            <motion.div
              key="loading-fallback"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="w-full"
            >
              <LoadingState />
            </motion.div>
          );
        }
        return (
          <motion.div
            key="preview"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
            className="w-full"
          >
            <PreviewStep
              propertyData={propertyData}
              handleBackClick={handlePreviewBack}
              handleSubmit={handleFinalSubmit}
            />
          </motion.div>
        );
    }
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

  return (
    <div className="relative">
      <StepIndicator {...getStepIndicatorProps()} />
      
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm"
        >
          An error occurred while generating property requirements. Please try again.
        </motion.div>
      )}
    </div>
  );
} 