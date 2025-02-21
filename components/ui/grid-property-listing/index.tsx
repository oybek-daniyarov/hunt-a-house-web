import { stegaClean } from 'next-sanity';
import { SearchParams } from 'nuqs/server';

import SectionContainer from '@/components/ui/section-container';
import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';
import PropertyFilters from './property-filters';
import PropertyGrid from './property-grid';

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

type GridPropertyListingProps = {
  _type: 'grid-property-listing';
  _key: string;
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | 'primary'
    | 'secondary'
    | 'card'
    | 'accent'
    | 'destructive'
    | 'background'
    | 'transparent';
  gridColumns: 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  perPage: number;
  filters: Filters;
  sortOptions: SortOption[];
  searchParams: Promise<SearchParams>;
};

export default async function GridPropertyListing({
  padding,
  colorVariant,
  gridColumns,
  perPage,
  filters,
  sortOptions,
  searchParams,
}: GridPropertyListingProps) {
  const color = stegaClean(colorVariant);

  const [filtersData] = await Promise.all([getLeadFilters()]);

  return (
    <SectionContainer color={color} padding={padding}>
      <PropertyFilters
        filters={filters}
        filtersData={filtersData}
        sortOptions={sortOptions}
      />
      <PropertyGrid
        searchParams={searchParams}
        gridColumns={gridColumns}
        perPage={perPage}
      />
    </SectionContainer>
  );
}
