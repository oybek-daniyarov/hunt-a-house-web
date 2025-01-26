'use client';

import { AnimatedStep } from "./animated-step";
import { DescribeStep } from "../describe-step";
import { ReviewStep } from "../review-step";
import { PreviewStep } from "../preview-step";
import { LoadingState } from "../loading-state";
import { usePropertyGeneratorContext } from "../property-generator-provider";

export function StepRenderer() {
  const {
    currentStep,
    description,
    propertyData,
    isLoading,
    setDescription,
    handleDescribeSubmit,
    handleReviewSubmit,
    handlePreviewBack,
    handleStartOver,
  } = usePropertyGeneratorContext();

  if (currentStep === 'describe') {
    return (
      <AnimatedStep stepKey="describe" className="w-full mt-4">
        <DescribeStep
          description={description}
          setDescription={setDescription}
          handleSubmit={handleDescribeSubmit}
          isLoading={isLoading}
        />
      </AnimatedStep>
    );
  }

  if (currentStep === 'loading' || !propertyData) {
    return (
      <AnimatedStep stepKey="loading" className="w-full">
        <LoadingState />
      </AnimatedStep>
    );
  }

  if (currentStep === 'review') {
    return (
      <AnimatedStep stepKey="review" className="w-full">
        <ReviewStep
          propertyData={propertyData}
          handleNewDescription={handleStartOver}
          handleSubmitClick={handleReviewSubmit}
        />
      </AnimatedStep>
    );
  }

  if (currentStep === 'preview') {
    return (
      <AnimatedStep stepKey="preview" className="w-full">
        <PreviewStep
          propertyData={propertyData}
          onBack={handlePreviewBack}
        />
      </AnimatedStep>
    );
  }

  return null;
} 