'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LeadContactFormData } from '@/components/forms/lead/lead-contact-form/schema';
import { LeadFormStep } from '@/components/forms/lead/lead-form-step/lead-form-step';
import { LeadFormStepData } from '@/components/forms/lead/lead-form-step/schema';
import UserInformationStep from '@/components/forms/lead/user-information-step';
import { Steps } from '@/components/steps/steps';
import { handleFormSuccess } from '@/lib/client/laravel/helpers/form.helpers';
import { createLeadAction } from '@/lib/data/laravel/lead/lead.actions';

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
  const router = useRouter();

  const handleComplete = async (data: LeadStepData) => {
    const { lead, contact } = data;

    if (!contact?.contact) {
      toast.error('Please provide contact information');
      return;
    }

    try {
      const result = await createLeadAction({
        locations: lead.location,
        propertyType: Number(lead.propertyType),
        activityType: Number(lead.activityType),
        bedrooms: lead.bedrooms ? Number(lead.bedrooms) : 0,
        bathrooms: lead.bathrooms ? Number(lead.bathrooms) : 0,
        minSize: lead.minSize ? Number(lead.minSize) : 0,
        maxSize: lead.maxSize ? Number(lead.maxSize) : 0,
        minBudget: lead.minBudget ? Number(lead.minBudget) : 0,
        maxBudget: lead.maxBudget ? Number(lead.maxBudget) : 0,
        budgetFrequency: lead.budgetFrequency as App.Enums.BudgetFrequency,
        description: lead.description,
        contact: Object.entries(contact.contact)
          .filter(([_, method]) => method.active && method.value)
          .map(([type, method]) => ({
            type,
            value: method.value,
          })),
      });

      if (result.success) {
        handleFormSuccess('Lead created successfully');
        router.push('/dashboard/my-leads');
      } else {
        toast.error(result.error?.message || 'Failed to create lead');
      }
    } catch (error) {
      console.error('Failed to create lead:', error);
      toast.error('An unexpected error occurred while creating the lead');
    }
  };

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

  return (
    <Steps<LeadStepData>
      steps={steps}
      initialData={initialData}
      onComplete={handleComplete}
    />
  );
};

export default LeadSteps;
