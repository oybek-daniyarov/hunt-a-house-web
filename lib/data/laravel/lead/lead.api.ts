import client from '@/lib/client/laravel/client';
import { createUrl, routes } from '@/types/api-routes';
import type { LeadFilterParams } from './lead.types';
import { buildLeadFilters, buildLeadSorting } from './lead.utils';

export async function getLeads(params: LeadFilterParams = {}) {
  const options = {
    page: params.page ? parseInt(params.page.toString()) : 1,
    perPage: 15,
    filters: buildLeadFilters(params),
    sort: buildLeadSorting(params.sort),
  };

  return client.list<App.Data.Lead.LeadListData>('/leads', options, ['leads']);
}

export async function getLeadFilters() {
  const url = createUrl(routes['leads.filters']);
  return client.get<App.Data.Lead.LeadFiltersData>(url, ['filters']);
}

export type { LeadFilterParams };
