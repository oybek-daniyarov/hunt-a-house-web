import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';
import { FiltersComponent } from './filters-component';
import {
  PropertyFiltersProvider,
  PropertyFiltersProviderProps,
} from './property-filters-context';

export default async function PropertyFilters({
  filters,
  sortOptions,
}: Omit<PropertyFiltersProviderProps, 'filtersData'>) {
  const filtersData = await getLeadFilters();

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
