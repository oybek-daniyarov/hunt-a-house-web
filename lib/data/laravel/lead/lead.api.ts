'use server';

import { get, list, post } from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';
import { PaginatedResponse } from '@/lib/client/laravel/types';
import { createUrl, routes } from '@/types/api-routes';
import type { LeadFilterParams } from './lead.types';

const LEAD_TAGS = ['leads'] as string[];

export async function getLeads(
  params: LeadFilterParams = {}
): Promise<PaginatedResponse<App.Data.Lead.LeadListData>> {
  const url = createUrl(routes['leads.list'], {
    page: params.page ? parseInt(params.page.toString()) : 1,
    perPage: 15,
    ...params,
  });
  console.log(url);
  return await list<App.Data.Lead.LeadListData>(url, LEAD_TAGS);
}

export async function getLead(
  id: number
): Promise<ApiResult<App.Data.Lead.LeadListData>> {
  try {
    const url = createUrl(routes['leads.show'], { id });
    const response = await get<ApiResult<App.Data.Lead.LeadListData>>(
      url,
      LEAD_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function createLead(
  data: App.Data.Lead.Payload.CreateLeadPayloadData
): Promise<ApiResult<App.Data.Lead.LeadListData>> {
  try {
    const url = createUrl(routes['leads.create']);
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
