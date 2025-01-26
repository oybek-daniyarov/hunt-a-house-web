'use client';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  filterParsers,
  usePropertyFilters,
} from '../../_hooks/use-property-filters';

type Props = {
  filterData: App.Data.Lead.LeadFiltersData;
};

type FilterKey =
  | 'emirates'
  | 'cities'
  | 'areas'
  | 'property_types'
  | 'activity_types'
  | 'bedrooms'
  | 'bathrooms';

type FilterBadgeProps = {
  label: string;
  onRemove: () => void;
};

function FilterBadge({ label, onRemove }: FilterBadgeProps) {
  return (
    <Badge variant="secondary">
      {label}
      <button onClick={onRemove} className="ml-1">
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}

export function PropertyListingSelections({ filterData }: Props) {
  const [filters, setFilters] = usePropertyFilters();

  const hasFilters =
    filters.search ||
    filters.emirate ||
    filters.propertyType ||
    filters.activityType ||
    filters.bedrooms !== 'Any' ||
    filters.bathrooms !== 'Any' ||
    filters.minBudget > 0 ||
    filters.maxBudget < 10000000 ||
    filters.minSize > 0 ||
    filters.maxSize < 7000;

  if (!hasFilters) return null;

  const removeFilter = (key: keyof typeof filters) => {
    setFilters({ [key]: filterParsers[key].defaultValue });
  };

  const removeRangeFilter = (
    minKey: keyof typeof filters,
    maxKey: keyof typeof filters
  ) => {
    setFilters({
      [minKey]: filterParsers[minKey].defaultValue,
      [maxKey]: filterParsers[maxKey].defaultValue,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatSize = (value: number) => {
    return `${value.toLocaleString()} sq.ft`;
  };

  const getLabel = (type: FilterKey, value: string) => {
    const typeData = filterData[type];
    if (!typeData) return value;
    return (
      typeData.find((filter) => filter.id === parseInt(value))?.name ?? value
    );
  };

  const singleFilters = [
    { key: 'search', label: `Search: ${filters.search}`, show: filters.search },
    {
      key: 'emirate',
      label: getLabel('emirates', filters.emirate),
      show: filters.emirate,
    },
    {
      key: 'propertyType',
      label: getLabel('property_types', filters.propertyType),
      show: filters.propertyType,
    },
    {
      key: 'activityType',
      label: getLabel('activity_types', filters.activityType),
      show: filters.activityType,
    },
    {
      key: 'bedrooms',
      label: getLabel('bedrooms', filters.bedrooms),
      show: filters.bedrooms,
    },
    {
      key: 'bathrooms',
      label: getLabel('bathrooms', filters.bathrooms),
      show: filters.bathrooms,
    },
  ];

  const rangeFilters = [
    {
      show: filters.minBudget > 0 || filters.maxBudget < 10000000,
      label: `Price: ${formatPrice(filters.minBudget)} - ${formatPrice(filters.maxBudget)}`,
      minKey: 'minBudget',
      maxKey: 'maxBudget',
    },
    {
      show: filters.minSize > 0 || filters.maxSize < 7000,
      label: `Size: ${formatSize(filters.minSize)} - ${formatSize(filters.maxSize)}`,
      minKey: 'minSize',
      maxKey: 'maxSize',
    },
  ];

  return (
    <div className="container py-2 flex flex-wrap gap-2">
      {singleFilters.map(
        ({ key, label, show }) =>
          show && (
            <FilterBadge
              key={key}
              label={label}
              onRemove={() => removeFilter(key as keyof typeof filters)}
            />
          )
      )}

      {rangeFilters.map(
        ({ show, label, minKey, maxKey }) =>
          show && (
            <FilterBadge
              key={minKey}
              label={label}
              onRemove={() =>
                removeRangeFilter(
                  minKey as keyof typeof filters,
                  maxKey as keyof typeof filters
                )
              }
            />
          )
      )}
    </div>
  );
}
