'use client';

import { LeadContactFormData } from '@/components/forms/lead/lead-contact-form/schema';
import { LeadFormStep } from '@/components/forms/lead/lead-form-step/lead-form-step';
import { LeadFormStepData } from '@/components/forms/lead/lead-form-step/schema';
import UserInformationStep from '@/components/forms/lead/user-information-step';
import { Steps } from '@/components/steps/steps';

type LeadStepsProps = {
  filters: App.Data.Lead.LeadFiltersData;
};

type LeadStepData = {
  lead: LeadFormStepData;
  contact?: LeadContactFormData;
  user: {
    isAuthenticated: boolean;
    user: App.Data.User.UserData | null;
  };
};

const initialData: LeadStepData = {
  lead: {
    location: [],
    propertyType: '',
    activityType: '',
    bedrooms: '',
    bathrooms: '',
    minSize: '',
    maxSize: '',
    minBudget: '',
    maxBudget: '',
    budgetFrequency: '',
    description: '',
  },
  user: {
    isAuthenticated: false,
    user: null,
  },
};

const LeadSteps = ({ filters }: LeadStepsProps) => {
  const steps = [
    {
      id: 'lead',
      title: 'Lead Information',
      description: 'Enter your lead information',
      component: <LeadFormStep filters={filters} />,
    },
    {
      id: 'user',
      title: 'User Information',
      description: 'Enter your user information',
      component: <UserInformationStep />,
    },
  ];

  return <Steps<LeadStepData> steps={steps} initialData={initialData} />;
};

export default LeadSteps;
