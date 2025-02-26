'use client';

import { FiltersComponent } from './filters-component';
import {
  PropertyFiltersProvider,
  PropertyFiltersProviderProps,
} from './property-filters-context';

export default function PropertyFilters({
  filters,
  filtersData,
  sortOptions,
}: PropertyFiltersProviderProps) {
  return (
    <PropertyFiltersProvider
      filters={filters}
      filtersData={filtersData}
      sortOptions={sortOptions}
    >
      <div className="mb-8">
        <FiltersComponent />
      </div>
    </PropertyFiltersProvider>
  );
}
