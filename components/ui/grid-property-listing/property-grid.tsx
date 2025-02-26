import { stegaClean } from 'next-sanity';
import { SearchParams } from 'nuqs/server';

import { LaravelPagination } from '@/components/laravel/pagination';
import { PropertyListingCard } from '@/components/ui/grid-property-listing/property-listing-card';
import { loadSearchParams } from '@/components/ui/grid-property-listing/search-params';
import { getLeads } from '@/lib/data/laravel/lead/lead.api';
import { cn } from '@/lib/utils';
import NoResultsFound from './no-results-found';

type PropertyGridProps = {
  gridColumns: 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  perPage: number;
  searchParams: SearchParams;
};

export default async function PropertyGrid({
  gridColumns,
  perPage,
  searchParams,
}: PropertyGridProps) {
  const filtersParams = await loadSearchParams(searchParams);

  const response = await getLeads({
    sort: filtersParams.sort,
    page: filtersParams.page || perPage,
    propertyType: filtersParams.propertyType,
    activityType: filtersParams.activityType,
    bedrooms: filtersParams.bedrooms,
    bathrooms: filtersParams.bathrooms,
    price: filtersParams.price,
    location: filtersParams.location,
  });

  const hasResults = response.data && response.data.length > 0;

  return (
    <>
      {hasResults ? (
        <>
          <div
            className={cn(
              'grid gap-4 sm:gap-6 md:gap-8',
              'grid-cols-1 sm:grid-cols-2',
              `lg:${stegaClean(gridColumns)}`
            )}
          >
            {response.data?.map((listing) => (
              <PropertyListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <LaravelPagination
            currentPage={response.current_page}
            lastPage={response.last_page}
            total={response.total}
          />
        </>
      ) : (
        <NoResultsFound />
      )}
    </>
  );
}
