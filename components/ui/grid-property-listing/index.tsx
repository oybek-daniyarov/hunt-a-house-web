import { Suspense } from 'react';
import { stegaClean } from 'next-sanity';
import { SearchParams } from 'nuqs/server';

import { PropertyListingGridSkeleton } from '@/components/listing/grid/property-listing-grid-skeleton';
import PropertyFilters from '@/components/ui/grid-property-listing/filters';
import SectionContainer from '@/components/ui/section-container';
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
  searchParams: SearchParams;
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

  return (
    <SectionContainer color={color} padding={padding}>
      <PropertyFilters filters={filters} sortOptions={sortOptions} />
      <Suspense fallback={<PropertyListingGridSkeleton />}>
        <PropertyGrid
          searchParams={searchParams}
          gridColumns={gridColumns}
          perPage={perPage}
        />
      </Suspense>
    </SectionContainer>
  );
}
