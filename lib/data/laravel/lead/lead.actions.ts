'use server';

import { createErrorResponse } from '@/lib/client/laravel';
import { createSuccessResponse } from '@/lib/client/laravel/helpers';
import { createLead } from './lead.api';

export async function createLeadAction(
  data: App.Data.Lead.Payload.CreateLeadPayloadData
) {
  const response = await createLead(data);
  if (!response.success) {
    return createErrorResponse(
      response.error?.message || 'Create lead failed',
      422,
      response.error?.errors
    );
  }
  return createSuccessResponse(response.data, '/dashboard/leads');
}
