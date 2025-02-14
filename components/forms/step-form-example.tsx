'use client';

import { useState } from 'react';
import { z } from 'zod';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { StepProvider, useSteps, type StepData } from '../steps/step-provider';

// Define the shape of your form data
interface FormData extends StepData {
  personalInfo: {
    name: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
  };
  preferences: {
    notifications: boolean;
  };
}

// Example step components with typed data
const PersonalInfoStep = () => {
  const { stepData, updateStepData, goToNextStep, isLoading, currentStep } =
    useSteps<FormData>();
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const personalInfo = stepData.personalInfo ?? { name: '', email: '' };

  const handleChange =
    (field: keyof typeof personalInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors({});
      updateStepData({
        personalInfo: { ...personalInfo, [field]: e.target.value },
      });
    };

  const handleNext = async () => {
    try {
      await personalInfoSchema.parseAsync(personalInfo);
      await goToNextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{currentStep?.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{currentStep?.description}</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <input
            type="text"
            value={personalInfo.name}
            onChange={handleChange('name')}
            placeholder="Name"
            className={cn(
              'w-full p-2 border rounded transition-colors',
              errors.name ? 'border-red-500' : 'border-gray-200'
            )}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1">
          <input
            type="email"
            value={personalInfo.email}
            onChange={handleChange('email')}
            placeholder="Email"
            className={cn(
              'w-full p-2 border rounded transition-colors',
              errors.email ? 'border-red-500' : 'border-gray-200'
            )}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-black text-white rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const AddressStep = () => {
  const { stepData, updateStepData, goToNextStep, isLoading, currentStep } =
    useSteps<FormData>();
  const [errors, setErrors] = useState<{ street?: string; city?: string }>({});
  const address = stepData.address ?? { street: '', city: '' };

  const handleChange =
    (field: keyof typeof address) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors({});
      updateStepData({
        address: { ...address, [field]: e.target.value },
      });
    };

  const handleNext = async () => {
    try {
      await addressSchema.parseAsync(address);
      await goToNextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{currentStep?.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{currentStep?.description}</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <input
            type="text"
            value={address.street}
            onChange={handleChange('street')}
            placeholder="Street"
            className={cn(
              'w-full p-2 border rounded transition-colors',
              errors.street ? 'border-red-500' : 'border-gray-200'
            )}
          />
          {errors.street && (
            <p className="text-xs text-red-500">{errors.street}</p>
          )}
        </div>
        <div className="space-y-1">
          <input
            type="text"
            value={address.city}
            onChange={handleChange('city')}
            placeholder="City"
            className={cn(
              'w-full p-2 border rounded transition-colors',
              errors.city ? 'border-red-500' : 'border-gray-200'
            )}
          />
          {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
        </div>
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-black text-white rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const PreferencesStep = () => {
  const {
    stepData,
    updateStepData,
    goToNextStep,
    isLoading,
    isLastStep,
    currentStep,
  } = useSteps<FormData>();
  const preferences = stepData.preferences ?? { notifications: false };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{currentStep?.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{currentStep?.description}</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) =>
                updateStepData({
                  preferences: { notifications: e.target.checked },
                })
              }
              className="rounded"
            />
            <span>Receive notifications</span>
          </label>
        </div>
        <button
          onClick={goToNextStep}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-black text-white rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLastStep ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
};

// Step progress indicator
const StepProgress = () => {
  const { steps, currentStepIndex } = useSteps<FormData>();
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-16 px-4 sm:px-6 lg:px-8">
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

// Step content wrapper
const StepContent = () => {
  const { currentStep } = useSteps<FormData>();
  if (!currentStep) return null;

  const StepComponent = currentStep.component;
  return (
    <div className="px-4">
      <div className="max-w-xl mx-auto">
        <StepComponent />
      </div>
    </div>
  );
};

// Validation schema for each step
const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
});

// Example form steps configuration
const steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Please provide your basic contact information.',
    component: PersonalInfoStep,
    canGoBack: false,
  },
  {
    id: 'address',
    title: 'Address Details',
    description: 'Where should we send your correspondence?',
    component: AddressStep,
    canGoBack: true,
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience with these preferences.',
    component: PreferencesStep,
    canGoBack: true,
  },
];

export const StepFormExample = () => {
  const initialData: Partial<FormData> = {
    personalInfo: { name: '', email: '' },
    address: { street: '', city: '' },
    preferences: { notifications: false },
  };

  const handleStepComplete = async (
    stepIndex: number,
    data: Partial<FormData>
  ) => {
    console.log(`Step ${stepIndex + 1} completed with data:`, data);
  };

  const handleNextStep = async (
    currentIndex: number,
    nextIndex: number,
    data: Partial<FormData>
  ) => {
    console.log(
      `Moving from step ${currentIndex + 1} to ${nextIndex + 1} with data:`,
      data
    );
  };

  const handlePrevStep = async (
    currentIndex: number,
    prevIndex: number,
    data: Partial<FormData>
  ) => {
    console.log(
      `Moving from step ${currentIndex + 1} to ${prevIndex + 1} with data:`,
      data
    );
  };

  return (
    <StepProvider
      steps={steps}
      initialData={initialData}
      onStepComplete={handleStepComplete}
      onNextStep={handleNextStep}
      onPrevStep={handlePrevStep}
    >
      <div className="w-full py-8">
        <StepProgress />
        <StepContent />
      </div>
    </StepProvider>
  );
};
