export type LeadFilterParams = {
  search?: string;
  propertyType?: string;
  activityType?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  price?: string | number;
  location?: string;
  sort?: string;
  page?: string | number;
};

export const LEAD_FILTER_MAPPINGS = {
  search: 'search',
  emirate: 'emirate',
  propertyType: 'property_type',
  activityType: 'activity_type',
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  minBudget: 'min_price',
  maxBudget: 'max_price',
  minSize: 'min_size',
  maxSize: 'max_size',
} as const;

export const LEAD_SORT_MAPPINGS = {
  newest: { field: 'created_at', direction: 'desc' },
  oldest: { field: 'created_at', direction: 'asc' },
  'price-asc': { field: 'min_price', direction: 'asc' },
  'price-desc': { field: 'min_price', direction: 'desc' },
  'size-asc': { field: 'min_size', direction: 'asc' },
  'size-desc': { field: 'min_size', direction: 'desc' },
} as const;
