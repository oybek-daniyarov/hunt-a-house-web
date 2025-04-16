'use server';

import { revalidatePath } from 'next/cache';

import {
  get,
  list,
  post,
  put,
  revalidateTagsAsync,
} from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';
import { PaginatedResponse } from '@/lib/client/laravel/types';
import { createUrl, routes } from '@/types/api-routes';
import type { LeadFilterParams } from './lead.types';

const LEAD_TAGS = ['leads'] as string[];

export async function getLeads(
  params: LeadFilterParams = {}
): Promise<PaginatedResponse<App.Data.Lead.LeadListData>> {
  const url = createUrl(routes['leads.index'], {
    page: params.page ? parseInt(params.page.toString()) : 1,
    perPage: 15,
    ...params,
  });
  return await list<App.Data.Lead.LeadListData>(url, LEAD_TAGS);
}

export async function createLead(
  data: App.Data.Lead.Payload.CreateLeadPayloadData
): Promise<ApiResult<App.Data.Lead.LeadListData>> {
  try {
    const url = createUrl(routes['leads.store']);
    const response = await post<ApiResult<App.Data.Lead.LeadListData>>(
      url,
      data,
      LEAD_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getLeadFilters(): Promise<App.Data.Lead.LeadFiltersData> {
  const url = createUrl(routes['leads.filters']);
  return get<App.Data.Lead.LeadFiltersData>(url, LEAD_TAGS);
}

export async function activateLead(
  data: App.Data.Lead.Payload.ActivateLeadPayloadData
): Promise<ApiResult<App.Data.Lead.ActivateLeadResponseData>> {
  const url = createUrl(routes['leads.activate']);

  try {
    const response = await post<
      ApiResult<App.Data.Lead.ActivateLeadResponseData>
    >(url, data, LEAD_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

type MineLeadsParams = {
  page?: number;
  status?: App.Enums.LeadStatus;
};

export async function getMineLeads(
  params: MineLeadsParams = {}
): Promise<PaginatedResponse<App.Data.Lead.LeadData>> {
  const url = createUrl(routes['leads.mine'], {
    page: params.page ? parseInt(params.page.toString()) : 1,
    ...params,
  });
  return await list<App.Data.Lead.LeadData>(url, LEAD_TAGS);
}

type PurchasedLeadsParams = {
  page?: number;
  status?: App.Enums.LeadStatus;
};

export async function getPurchasedLeads(
  params: PurchasedLeadsParams = {}
): Promise<PaginatedResponse<App.Data.Lead.LeadData>> {
  const url = createUrl(routes['leads.purchased'], {
    page: params.page ? parseInt(params.page.toString()) : 1,
    ...params,
  });
  return await list<App.Data.Lead.LeadData>(url, LEAD_TAGS);
}

export async function getLeadById(
  id: string
): Promise<App.Data.Lead.Response.ShowLeadResponseData> {
  const url = createUrl(routes['leads.show'], { lead: id });
  return await get<App.Data.Lead.Response.ShowLeadResponseData>(url, LEAD_TAGS);
}

// Define the type for lead purchase params
type LeadPurchaseParams = {
  page?: number;
};

export async function getLeadPurchases(
  params: LeadPurchaseParams = {}
): Promise<PaginatedResponse<App.Data.Invoice.LeadPurchaseTransactionData>> {
  const url = createUrl(routes['invoices.lead-purchases'], {
    page: params.page ? parseInt(params.page.toString()) : 1,
    ...params,
  });
  return await list<App.Data.Invoice.LeadPurchaseTransactionData>(
    url,
    LEAD_TAGS
  );
}

export async function purchaseLead(leadId: string) {
  const url = createUrl(routes['leads.purchase'], { uuid: leadId });

  const response = await post<App.Data.Lead.PurchaseLeadResponseData>(
    url,
    null,
    LEAD_TAGS
  );

  // Revalidate all relevant tags
  await revalidateTagsAsync([...LEAD_TAGS, 'auth', 'user']);

  // Revalidate all paths that might display user credit/token information
  revalidatePath('/', 'layout'); // Revalidate the root layout which includes the header
  revalidatePath('/api/auth/session'); // Revalidate the auth session API route
  revalidatePath('/uae-property-listings');
  revalidatePath('/dashboard', 'layout');
  revalidatePath('/dashboard/user', 'layout');
  revalidatePath('/dashboard/user/leads');
  revalidatePath('/dashboard/agent/leads'); // Revalidate the agent leads page

  return response;
}

export async function updateMineLead(
  leadId: string,
  data: App.Data.Lead.Payload.UpdateLeadPayloadData
) {
  try {
    const url = createUrl(routes['leads.mine.update'], { lead: leadId });
    const response = await put(url, data, LEAD_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}
