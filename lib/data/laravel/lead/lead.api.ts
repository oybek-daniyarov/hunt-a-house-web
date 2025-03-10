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
