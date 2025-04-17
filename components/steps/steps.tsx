import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Step, StepProvider, useSteps } from '@/components/steps/step-provider';
import { Button } from '@/components/ui/button';

const StepProgress = () => {
  const {
    steps,
    currentStepIndex,
    goToPreviousStep,
    goToNextStep,
    isFirstStep,
    isLastStep,
    isLoading,
  } = useSteps<FormData>();
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToPreviousStep()}
          disabled={isFirstStep || isLoading}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">
            {currentStepIndex + 1}/{steps.length}
          </p>
          <div className="w-16 h-1 bg-muted overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!isLastStep ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToNextStep()}
            disabled={isLoading}
            className="flex items-center gap-1 text-primary hover:text-primary/80"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <div className="w-[70px]"></div>
        )}
      </div>
    </div>
  );
};

const StepContent = () => {
  const { currentStep } = useSteps<FormData>();
  const component = currentStep?.component;
  return <div>{component}</div>;
};

type StepProps<T extends Record<string, unknown>> = {
  steps: Step[];
  initialData: T;
  onComplete?: (data: T) => void;
};

export const Steps = <T extends Record<string, unknown>>({
  steps,
  initialData,
  onComplete,
}: StepProps<T>) => {
  return (
    <StepProvider
      steps={steps}
      initialData={initialData}
      onComplete={onComplete}
    >
      <div className="space-y-4 p-4">
        {/* <StepProgress /> */}
        <StepContent />
      </div>
    </StepProvider>
  );
};
