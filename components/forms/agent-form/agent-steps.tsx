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
};

const AgentSteps = ({ locations }: AgentStepsProps) => {
  // Get the default company type from the API data if available

  const initialData: AgentStepData = {
    agentInfo: {
      companyName: '',
      companyType: '',
      companySize: '1',
      locationId: '',
      address: '',
      website: '',
      reraNumber: '',
      tradeLicense: '',
    },
    agentDetails: {
      name: '',
      email: '',
      phone: '',
      additionalInfo: '',
      terms: false,
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
