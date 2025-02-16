'use client';

import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export const filterParsers = {
  search: parseAsString.withDefault(''),
  propertyType: parseAsString.withDefault(''),
  activityType: parseAsString.withDefault(''),
  bedrooms: parseAsString.withDefault(''),
  bathrooms: parseAsString.withDefault(''),
  minBudget: parseAsInteger.withDefault(0),
  maxBudget: parseAsInteger.withDefault(10000000),
  minSize: parseAsInteger.withDefault(0),
  maxSize: parseAsInteger.withDefault(7000),
  sort: parseAsString.withDefault('newest'),
  page: parseAsInteger.withDefault(1),
};

export function usePropertyFilters() {
  return useQueryStates(filterParsers, {
    history: 'push',
    shallow: false,
  });
}

// Helper types
export type PropertyFilters = typeof filterParsers;
export type FilterKeys = keyof PropertyFilters;
