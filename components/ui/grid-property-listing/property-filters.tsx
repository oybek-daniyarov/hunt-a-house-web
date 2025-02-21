'use client';

import { X } from 'lucide-react';

import { usePropertyFilters } from '@/components/ui/grid-property-listing/use-property-filters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../button';

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

type PropertyFiltersProps = {
  filters: Filters;
  filtersData: App.Data.Lead.LeadFiltersData;
  sortOptions: SortOption[];
};

const priceRanges = [
  { label: 'AED 0 - 40,000', value: '0-40000' },
  { label: 'AED 40,000 - 80,000', value: '40000-80000' },
  { label: 'AED 80,000 - 120,000', value: '80000-120000' },
  { label: 'AED 120,000 - 160,000', value: '120000-160000' },
  { label: 'AED 160,000 - 200,000', value: '160000-200000' },
  { label: 'AED 200,000+', value: '200000+' },
];

export default function PropertyFilters({
  filters: filtersStore,
  filtersData,
  sortOptions,
}: PropertyFiltersProps) {
  const [filters, setFilters] = usePropertyFilters();

  const handleSetFilters = async (newFilters: Partial<typeof filters>) => {
    await setFilters({ ...newFilters, page: 1 });
  };
  const handleClear = async () => {
    await setFilters(null);
  };

  const hasFilters = Object.entries(filters).some(
    ([key, value]) => !['page', 'sort'].includes(key) && value
  );

  return (
    <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4">
        {filtersStore.propertyType && (
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleSetFilters({ propertyType: value })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {filtersData.propertyTypes.map((propertyType) => (
                <SelectItem
                  key={propertyType.id}
                  value={propertyType.id.toString()}
                >
                  {propertyType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filtersStore.activityType && (
          <Select
            value={filters.activityType}
            onValueChange={(value) => handleSetFilters({ activityType: value })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Activity Type" />
            </SelectTrigger>
            <SelectContent>
              {filtersData.activityTypes.map((activityType) => (
                <SelectItem
                  key={activityType.id}
                  value={activityType.id.toString()}
                >
                  {activityType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filtersStore.price && (
          <Select
            value={filters.price}
            onValueChange={(value) => handleSetFilters({ price: value })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((priceRange) => (
                <SelectItem key={priceRange.value} value={priceRange.value}>
                  {priceRange.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filtersStore.bedrooms && (
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleSetFilters({ bedrooms: value })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {filtersData.bedrooms.map((bedroom) => (
                <SelectItem key={bedroom.id} value={bedroom.id.toString()}>
                  {bedroom.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {filtersStore.bathrooms && (
          <Select
            value={filters.bathrooms}
            onValueChange={(value) => handleSetFilters({ bathrooms: value })}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              {filtersData.bathrooms.map((bathroom) => (
                <SelectItem key={bathroom.id} value={bathroom.id.toString()}>
                  {bathroom.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 shrink-0"
            onClick={handleClear}
          >
            Clear
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Select
        value={filters.sort}
        onValueChange={(value) => handleSetFilters({ sort: value })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
