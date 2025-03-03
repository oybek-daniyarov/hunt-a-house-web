'use client';

import { Steps } from '@/components/steps/steps';
import { AgentDetailsStep } from './agent-details-step/agent-details-step';
import { AgentDetailsStepData } from './agent-details-step/schema';
import { AgentInfoStep } from './agent-info-step/agent-info-step';
import { AgentInfoStepData } from './agent-info-step/schema';

type AgentStepsProps = {
  locations: App.Services.Location.Data.LocationData[];
};

type AgentStepData = {
  agentInfo: AgentInfoStepData;
  agentDetails: AgentDetailsStepData;
  user: {
    isAuthenticated: boolean;
    user: App.Data.User.UserData | null;
  };
};

const AgentSteps = ({ locations }: AgentStepsProps) => {
  // Get the default company type from the API data if available

  const initialData: AgentStepData = {
    agentInfo: {
      name: '',
      email: '',
      phone: '',
      companyName: '',
      companyType: '',
      companySize: '1',
      locationId: '',
    },
    agentDetails: {
      address: '',
      website: '',
      reraNumber: '',
      tradeLicense: '',
      additionalInfo: '',
      terms: false,
    },
    user: {
      isAuthenticated: false,
      user: null,
    },
  };

  const steps = [
    {
      id: 'agent-info',
      title: 'Agent Information',
      description: 'Enter your basic information',
      component: <AgentInfoStep locations={locations} />,
    },
    {
      id: 'agent-details',
      title: 'Additional Details',
      description: 'Enter additional information about your agency',
      component: <AgentDetailsStep />,
    },
  ];

  return <Steps<AgentStepData> steps={steps} initialData={initialData} />;
};

export default AgentSteps;
