'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { usePropertyFilters } from '@/components/ui/grid-property-listing/use-property-filters';

// Types
type Filters = {
  propertyType: boolean;
  price: boolean;
  bedrooms: boolean;
  bathrooms: boolean;
  location: boolean;
  activityType: boolean;
};

type SortOption = {
  label: string;
  value: string;
};

type OptionData = {
  id: string | number;
  name: string;
};

// Price ranges data
export const priceRanges = [
  { label: 'AED 0 - 40,000', value: '0-40000' },
  { label: 'AED 40,000 - 80,000', value: '40000-80000' },
  { label: 'AED 80,000 - 120,000', value: '80000-120000' },
  { label: 'AED 120,000 - 160,000', value: '120000-160000' },
  { label: 'AED 160,000 - 200,000', value: '160000-200000' },
  { label: 'AED 200,000+', value: '200000+' },
];

// Custom hook for debouncing values
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Context for property filters
export type PropertyFiltersContextType = {
  filters: Record<string, any>;
  filtersData: App.Data.Lead.LeadFiltersData;
  sortOptions: SortOption[];
  locationInput: string;
  setLocationInput: (value: string) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (value: boolean) => void;
  hasFilters: boolean;
  handleSetFilters: (filters: Partial<Record<string, any>>) => Promise<void>;
  handleClear: () => Promise<void>;
  handleRemoveFilter: (key: string) => Promise<void>;
  getFilterLabel: (key: string, value: string | number) => string;
  getActiveFilterCount: () => number;
};

export const PropertyFiltersContext =
  createContext<PropertyFiltersContextType | null>(null);

// Custom hook to use the property filters context
export function usePropertyFiltersContext() {
  const context = useContext(PropertyFiltersContext);
  if (!context) {
    throw new Error(
      'usePropertyFiltersContext must be used within a PropertyFiltersProvider'
    );
  }
  return context;
}

// Custom hook for filter labels
export function useFilterLabels(filtersData: App.Data.Lead.LeadFiltersData) {
  return useCallback(
    (key: string, value: string | number) => {
      const stringValue = String(value);
      switch (key) {
        case 'propertyType':
          return (
            filtersData.propertyTypes.find(
              (pt) => pt.id.toString() === stringValue
            )?.name || stringValue
          );
        case 'activityType':
          return (
            filtersData.activityTypes.find(
              (at) => at.id.toString() === stringValue
            )?.name || stringValue
          );
        case 'bedrooms':
          return (
            filtersData.bedrooms.find((b) => b.id.toString() === stringValue)
              ?.name || stringValue
          );
        case 'bathrooms':
          return (
            filtersData.bathrooms.find((b) => b.id.toString() === stringValue)
              ?.name || stringValue
          );
        case 'price':
          return (
            priceRanges.find((pr) => pr.value === stringValue)?.label ||
            stringValue
          );
        case 'location':
          return stringValue;
        default:
          return stringValue;
      }
    },
    [filtersData]
  );
}

// Property Filters Provider Component
export type PropertyFiltersProviderProps = {
  filters: Filters;
  filtersData: App.Data.Lead.LeadFiltersData;
  sortOptions: SortOption[];
};

export function PropertyFiltersProvider({
  children,
  filters: enabledFilters,
  filtersData,
  sortOptions,
}: React.PropsWithChildren<PropertyFiltersProviderProps>) {
  // State and hooks
  const [filters, setFilters] = usePropertyFilters();
  const [locationInput, setLocationInput] = useState(filters.location || '');
  const debouncedLocation = useDebounce(locationInput, 500);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const getFilterLabel = useFilterLabels(filtersData);

  // Handle filter changes
  const handleSetFilters = useCallback(
    async (newFilters: Partial<typeof filters>) => {
      await setFilters({ ...newFilters, page: 1 });
    },
    [setFilters]
  );

  // Clear all filters
  const handleClear = useCallback(async () => {
    setLocationInput('');
    await setFilters(null);
    setIsFiltersOpen(false);
  }, [setFilters]);

  // Handle individual filter removal
  const handleRemoveFilter = useCallback(
    async (key: string) => {
      if (key === 'location') {
        setLocationInput('');
      }
      await handleSetFilters({ [key]: '' });
    },
    [handleSetFilters]
  );

  // Update filters when debounced location changes
  useEffect(() => {
    if (debouncedLocation !== filters.location) {
      handleSetFilters({ location: debouncedLocation });
    }
  }, [debouncedLocation, filters.location, handleSetFilters]);

  // Sync locationInput with filters.location
  useEffect(() => {
    if (filters.location === '') {
      setLocationInput('');
    }
  }, [filters.location]);

  // Check if any filters are active
  const hasFilters = Object.entries(filters).some(
    ([key, value]) => !['page', 'sort'].includes(key) && value
  );

  // Count active filters
  const getActiveFilterCount = useCallback(() => {
    return Object.entries(filters).filter(
      ([key, value]) => !['page', 'sort'].includes(key) && value
    ).length;
  }, [filters]);

  const contextValue: PropertyFiltersContextType = {
    filters,
    filtersData,
    sortOptions,
    locationInput,
    setLocationInput,
    isFiltersOpen,
    setIsFiltersOpen,
    hasFilters,
    handleSetFilters,
    handleClear,
    handleRemoveFilter,
    getFilterLabel,
    getActiveFilterCount,
  };

  return (
    <PropertyFiltersContext.Provider value={contextValue}>
      {children}
    </PropertyFiltersContext.Provider>
  );
}
