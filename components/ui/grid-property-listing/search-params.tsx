import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const filterParsers = {
  search: parseAsString.withDefault(''),
  propertyType: parseAsString.withDefault(''),
  activityType: parseAsString.withDefault(''),
  bedrooms: parseAsString.withDefault(''),
  bathrooms: parseAsString.withDefault(''),
  price: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('newest'),
  page: parseAsInteger.withDefault(1),
};

export const loadSearchParams = createLoader(filterParsers);

export type PropertyFilters = typeof filterParsers;
export type FilterKeys = keyof PropertyFilters;
