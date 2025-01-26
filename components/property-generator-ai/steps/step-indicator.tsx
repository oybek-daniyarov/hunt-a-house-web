'use client';

import { Check } from 'lucide-react';

import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';
import { cn } from '@/lib/utils';

interface StepProps {
  number: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  isCompleted: boolean;
  isPulsing?: boolean;
}

function Step({
  number,
  title,
  subtitle,
  isActive,
  isCompleted,
  isPulsing,
}: StepProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium shadow-sm',
          isActive
            ? 'border-primary bg-primary text-background'
            : isPulsing
              ? 'border-primary/50 bg-primary/10 text-primary animate-pulse'
              : 'border-border/50 bg-muted/50 text-muted-foreground'
        )}
      >
        {isCompleted ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : number}
      </div>
      <div>
        <div className="text-xs sm:text-sm font-medium text-center">
          {title}
        </div>
        <div className="text-[10px] sm:text-xs text-muted-foreground text-center hidden sm:block">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function Connector({ progress }: { progress: number }) {
  return (
    <div className="w-16 sm:w-32 h-[2px] bg-border relative top-[-12px]">
      <div
        className={cn('h-full bg-primary transition-all duration-500')}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function StepIndicator() {
  const { currentStep } = usePropertyGenerator();

  const showResults = currentStep === 'review' || currentStep === 'preview';
  const hasPartialData = currentStep === 'loading';
  const isPreviewStep = currentStep === 'preview';

  return (
    <div className="mb-4 sm:mb-8">
      <div className="flex items-center justify-between mx-auto max-w-[90%] sm:max-w-full">
        <Step
          number="1"
          title="Describe"
          subtitle="Natural language input"
          isActive={!showResults}
          isCompleted={showResults}
        />

        <Connector progress={hasPartialData ? 50 : showResults ? 100 : 0} />

        <Step
          number="2"
          title="Review & Edit"
          subtitle="Verify details"
          isActive={hasPartialData && !isPreviewStep}
          isCompleted={false}
          isPulsing={showResults && !isPreviewStep}
        />

        <Connector progress={isPreviewStep ? 100 : 0} />

        <Step
          number="3"
          title="Preview & Submit"
          subtitle="Final review"
          isActive={isPreviewStep}
          isCompleted={false}
        />
      </div>
    </div>
  );
}
