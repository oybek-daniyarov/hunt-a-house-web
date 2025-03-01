import { Progress } from '@radix-ui/react-progress';

import { Step, StepProvider, useSteps } from '@/components/steps/step-provider';

const StepProgress = () => {
  const { steps, currentStepIndex } = useSteps<FormData>();
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div>
      <Progress value={progress} className="h-1" />
      <div className="flex justify-between text-sm font-medium text-muted-foreground">
        <p>
          Step {currentStepIndex + 1} of {steps.length}
        </p>
        <p className="text-sm text-muted-foreground">
          {steps[currentStepIndex]?.title}
        </p>
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
        <StepProgress />
        <StepContent />
      </div>
    </StepProvider>
  );
};
