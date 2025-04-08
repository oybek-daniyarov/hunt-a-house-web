import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const filterParsers = {
  location: parseAsString.withDefault(''),
  propertyType: parseAsString.withDefault(''),
  activityType: parseAsString.withDefault(''),
  bedrooms: parseAsString.withDefault(''),
  bathrooms: parseAsString.withDefault(''),
  price: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('newest'),
  page: parseAsInteger.withDefault(1),
  listingId: parseAsString.withDefault(''),
};

export const loadSearchParams = createLoader(filterParsers);

export type PropertyFilters = typeof filterParsers;
export type FilterKeys = keyof PropertyFilters;
