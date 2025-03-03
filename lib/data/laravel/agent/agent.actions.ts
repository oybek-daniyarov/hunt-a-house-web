'use server';

import {
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/client/laravel';
import { createAgent } from '@/lib/data/laravel/agent/agent.api';

const createAgentAction = async (
  data: App.Data.Agent.Payload.CreateAgentPayloadData
) => {
  const response = await createAgent(data);
  if (!response.success) {
    return createErrorResponse(
      response.error?.message || 'Create agent failed',
      422,
      response.error?.errors
    );
  }
  return createSuccessResponse(response.data, '/dashboard/user/agents');
};

export default createAgentAction;
