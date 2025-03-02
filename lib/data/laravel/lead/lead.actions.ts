'use server';

import { headers } from 'next/headers';

import { createErrorResponse } from '@/lib/client/laravel';
import { setSession } from '@/lib/client/laravel/auth';
import { createSuccessResponse } from '@/lib/client/laravel/helpers';
import { activateLead, createLead } from './lead.api';

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
  return createSuccessResponse(response.data, '/dashboard/user/leads');
}

export async function activateLeadAction(
  data: App.Data.Lead.Payload.ActivateLeadPayloadData
) {
  try {
    const response = await activateLead(data);

    if (!response.success) {
      return createErrorResponse(
        response.error?.message || 'Activate lead failed',
        422,
        response.error?.errors
      );
    }

    // Store the token if it exists via the API route
    if (response.data?.token) {
      try {
        const tokenSet = await setSession({
          token: response.data.token,
          headers: await headers(),
        });
        if (!tokenSet) {
          console.error('Failed to set auth token');
        }
      } catch (tokenError) {
        console.error('Error setting auth token:', tokenError);
      }
    } else {
      console.error('No token found in response');
    }

    // Return success response
    return createSuccessResponse(response.data, '/dashboard/user/leads');
  } catch (error) {
    console.error('Lead activation API error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Activate lead failed',
      500
    );
  }
}
