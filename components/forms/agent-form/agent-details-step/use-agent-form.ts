import { useRouter } from 'next/navigation';
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
const SUCCESS_REDIRECT_PATH = '/dashboard/agent';

export const useAgentForm = () => {
  const { stepData } = useSteps();
  const router = useRouter();

  const form = useForm<AgentDetailsStepData>({
    resolver: zodResolver(agentDetailsStepSchema),
    defaultValues: {
      address: '',
      website: '',
      reraNumber: '',
      tradeLicense: '',
      additionalInfo: '',
      terms: false,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: AgentDetailsStepData) => {
    try {
      const result = await createAgentAction({
        name: stepData.agentInfo.name,
        email: stepData.agentInfo.email,
        phone: stepData.agentInfo.phone,
        companyName: stepData.agentInfo.companyName,
        companyType: stepData.agentInfo.companyType as App.Enums.CompanyType,
        companySize: stepData.agentInfo.companySize,
        locationId: stepData.agentInfo.locationId,
        address: data.address || null,
        website: data.website || null,
        reraNumber: data.reraNumber || null,
        tradeLicense: data.tradeLicense || null,
        additionalInfo: data.additionalInfo || null,
      });

      if (result.success) {
        handleFormSuccess(SUCCESS_MESSAGE);
        router.push(SUCCESS_REDIRECT_PATH);
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
  };
};
