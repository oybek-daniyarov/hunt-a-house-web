'use client';

import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';
import { DescribeStep } from '../steps/describe-step';
import { LoadingState } from '../steps/loading-state';
import { PreviewStep } from '../steps/preview-step';
import { ReviewStep } from '../steps/review-step';
import { AnimatedStep } from './animated-step';

export function StepRenderer() {
  const {
    propertyData,
    currentStep,
    handleReviewSubmit,
    handlePreviewBack,
    handleStartOver,
  } = usePropertyGenerator();

  if (currentStep === 'describe') {
    return (
      <AnimatedStep stepKey="describe" className="w-full mt-4">
        <DescribeStep />
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
          handleNewDescription={handleStartOver}
          handleSubmitClick={handleReviewSubmit}
        />
      </AnimatedStep>
    );
  }

  if (currentStep === 'preview') {
    return (
      <AnimatedStep stepKey="preview" className="w-full">
        <PreviewStep onBack={handlePreviewBack} />
      </AnimatedStep>
    );
  }

  return null;
}
