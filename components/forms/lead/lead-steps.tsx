'use client';

import { LeadFormStep } from '@/components/forms/lead/lead-form-step';
import UserInformationStep from '@/components/forms/lead/user-information-step';
import { Steps } from '@/components/steps/steps';

type LeadStepsProps = {
  filters: App.Data.Lead.LeadFiltersData;
};

const initialData = {
  lead: {
    location: '',
    propertyType: '',
    activityType: '',
    bedrooms: '',
    bathrooms: '',
    minSize: '',
    maxSize: '',
    minBudget: '',
    maxBudget: '',
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

  return <Steps steps={steps} initialData={initialData} />;
};

export default LeadSteps;
