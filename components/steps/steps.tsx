import { Progress } from '@radix-ui/react-progress';

import { Step, StepProvider, useSteps } from '@/components/steps/step-provider';

const StepProgress = () => {
  const { steps, currentStepIndex } = useSteps<FormData>();
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-4">
        <Progress value={progress} className="h-1" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>
            Step {currentStepIndex + 1} of {steps.length}
          </p>
          <p>{steps[currentStepIndex]?.title}</p>
        </div>
      </div>
    </div>
  );
};

const StepContent = () => {
  const { currentStep } = useSteps<FormData>();
  const component = currentStep?.component;
  return <div className="px-4 sm:px-6 lg:px-8">{component}</div>;
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
      <div className="space-y-8 py-8">
        <StepProgress />
        <StepContent />
      </div>
    </StepProvider>
  );
};
