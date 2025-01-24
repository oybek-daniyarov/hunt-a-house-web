import client from "@/lib/client/laravel/client"
import { buildLeadFilters, buildLeadSorting } from "./lead.utils"
import type { LeadFilterParams } from "./lead.types"

export async function getLeads(params: LeadFilterParams = {}) {
  const options = {
    page: params.page ? parseInt(params.page.toString()) : 1,
    perPage: 15,
    filters: buildLeadFilters(params),
    sort: buildLeadSorting(params.sort)
  }

  return client.list<App.Data.Lead.LeadListData>(
    '/leads',
    options,
    ['leads']
  )
}

export async function getLeadFilters() {
  return client.get<App.Data.Lead.LeadFiltersData>(
    '/leads/filters'
  )
}

export type { LeadFilterParams }