import type { Filter, SortOption } from '@/lib/client/laravel/types';
import {
  LEAD_FILTER_MAPPINGS,
  LEAD_SORT_MAPPINGS,
  type LeadFilterParams,
} from './lead.types';

export function buildLeadFilters(params: LeadFilterParams): Filter[] {
  const filters: Filter[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (!value || key === 'sort' || key === 'page') return;

    const fieldName =
      LEAD_FILTER_MAPPINGS[key as keyof typeof LEAD_FILTER_MAPPINGS];
    if (!fieldName) return;

    if (key.startsWith('min')) {
      filters.push({
        field: fieldName,
        operator: 'gte',
        value: parseInt(value.toString()),
      });
    } else if (key.startsWith('max')) {
      filters.push({
        field: fieldName,
        operator: 'lte',
        value: parseInt(value.toString()),
      });
    } else {
      filters.push({
        field: fieldName,
        operator: key === 'search' ? 'like' : 'eq',
        value: value.toString(),
      });
    }
  });

  return filters;
}

export function buildLeadSorting(sort?: string): SortOption[] {
  if (!sort) return [{ field: 'created_at', direction: 'desc' }];

  const sortConfig =
    LEAD_SORT_MAPPINGS[sort as keyof typeof LEAD_SORT_MAPPINGS];
  return [sortConfig || LEAD_SORT_MAPPINGS.newest];
}
