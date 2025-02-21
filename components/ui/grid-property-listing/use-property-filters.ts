'use client';

import { useQueryStates } from 'nuqs';

import { filterParsers } from './search-params';

export function usePropertyFilters() {
  return useQueryStates(filterParsers, {
    history: 'push',
    shallow: false,
  });
}

// Helper types
export type PropertyFilters = typeof filterParsers;
export type FilterKeys = keyof PropertyFilters;
