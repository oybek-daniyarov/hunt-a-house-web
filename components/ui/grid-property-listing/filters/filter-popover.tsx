'use client';

import { Building2, Filter, Home, SlidersHorizontal, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FilterCounterBadge, SelectWithIcon } from './filter-components';
import {
  priceRanges,
  usePropertyFiltersContext,
} from './property-filters-context';

export function FilterPopover() {
  const {
    filters,
    filtersData,
    isFiltersOpen,
    setIsFiltersOpen,
    hasFilters,
    handleSetFilters,
    handleClear,
    getActiveFilterCount,
  } = usePropertyFiltersContext();

  // Count active filters for badge
  const activeFilterCount = getActiveFilterCount();

  return (
    <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative ">
          <Filter className="h-4 w-4" />
          <FilterCounterBadge count={activeFilterCount} />
          <span className="hidden md:block">Filters</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-1rem)] md:w-[500px] p-4"
        align="start"
      >
        {/* Clear filters button (only shown if filters are active) */}
        {hasFilters && (
          <div className="flex justify-end mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleClear}
            >
              Clear All
              <X className="h-3 w-3 ms-1" />
            </Button>
          </div>
        )}

        {/* Filter options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Property Type */}
          <SelectWithIcon
            value={filters.propertyType as string}
            onChange={(value) => handleSetFilters({ propertyType: value })}
            placeholder="Property Type"
            options={filtersData.propertyTypes}
            icon={<Building2 className="h-4 w-4" />}
          />

          {/* Price */}
          <SelectWithIcon
            value={filters.price as string}
            onChange={(value) => handleSetFilters({ price: value })}
            placeholder="Price Range"
            options={priceRanges}
            icon={<SlidersHorizontal className="h-4 w-4" />}
            valueKey="value"
            labelKey="label"
          />

          {/* Bedrooms */}
          <SelectWithIcon
            value={filters.bedrooms as string}
            onChange={(value) => handleSetFilters({ bedrooms: value })}
            placeholder="Bedrooms"
            options={filtersData.bedrooms}
            icon={<Home className="h-4 w-4" />}
          />

          {/* Bathrooms */}
          <SelectWithIcon
            value={filters.bathrooms as string}
            onChange={(value) => handleSetFilters({ bathrooms: value })}
            placeholder="Bathrooms"
            options={filtersData.bathrooms}
            icon={<Home className="h-4 w-4" />}
          />

          {/* Activity Type */}
          <SelectWithIcon
            value={filters.activityType as string}
            onChange={(value) => handleSetFilters({ activityType: value })}
            placeholder="Activity Type"
            options={filtersData.activityTypes}
            icon={<Building2 className="h-4 w-4" />}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
