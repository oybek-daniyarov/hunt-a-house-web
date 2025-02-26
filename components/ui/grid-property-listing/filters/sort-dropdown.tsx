'use client';

import { SortAsc } from 'lucide-react';

import { SelectWithIcon } from './filter-components';
import { usePropertyFiltersContext } from './property-filters-context';

export function SortDropdown() {
  const { filters, sortOptions, handleSetFilters } =
    usePropertyFiltersContext();

  return (
    <SelectWithIcon
      value={filters.sort as string}
      onChange={(value) => handleSetFilters({ sort: value })}
      options={sortOptions}
      icon={<SortAsc className="h-4 w-4" />}
      placeholder="Sort By"
      className="w-[140px] md:w-[180px]"
      valueKey="value"
      labelKey="label"
    />
  );
}
