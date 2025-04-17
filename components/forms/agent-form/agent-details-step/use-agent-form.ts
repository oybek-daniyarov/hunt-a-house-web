import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSteps } from '@/components/steps/step-provider';
import {
  handleFormError,
  handleFormSuccess,
} from '@/lib/client/laravel/helpers/form.helpers';
import createAgentAction from '@/lib/data/laravel/agent/agent.actions';
import { AgentDetailsStepData, agentDetailsStepSchema } from './schema';

const SUCCESS_MESSAGE = 'Agent profile created successfully';
const ERROR_MESSAGE = 'Failed to create agent profile';
const ERROR_MESSAGE_UNEXPECTED =
  'An unexpected error occurred while creating the agent profile';

export const useAgentForm = () => {
  const { stepData } = useSteps();
  const [isDone, setIsDone] = useState(false);

  const form = useForm<AgentDetailsStepData>({
    resolver: zodResolver(agentDetailsStepSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      additionalInfo: '',
      terms: false,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: AgentDetailsStepData) => {
    try {
      const result = await createAgentAction({
        name: data.name,
        email: data.email,
        phone: data.phone,
        additionalInfo: data.additionalInfo || null,
        companyName: stepData.agentInfo.companyName,
        companyType: stepData.agentInfo.companyType as App.Enums.CompanyType,
        companySize: stepData.agentInfo.companySize,
        locationId: stepData.agentInfo.locationId,
        address: stepData.agentInfo.address || null,
        website: stepData.agentInfo.website || null,
        reraNumber: stepData.agentInfo.reraNumber || null,
        tradeLicense: stepData.agentInfo.tradeLicense || null,
      });

      if (result.success) {
        setIsDone(true);
        handleFormSuccess(SUCCESS_MESSAGE);
      } else {
        handleFormError(form, result.error, ERROR_MESSAGE);
      }
    } catch (error) {
      console.error('Failed to create agent profile:', error);
      handleFormError(form, undefined, ERROR_MESSAGE_UNEXPECTED);
    }
  };

  return {
    form,
    onSubmit,
    isDone,
  };
};
