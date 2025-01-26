import { LaravelPagination } from '@/components/laravel/pagination';
import type { PaginatedResponse } from '@/lib/client/laravel/types';
import {
  getLeads,
  type LeadFilterParams,
} from '@/lib/data/laravel/lead/lead.api';
import ContactModal from './_components/contact-modal';
import Filters from './_components/filters';
import { PropertyListingCard } from './_components/property-listing-card';

interface PropertyListingsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertyListingsPage({
  searchParams,
}: PropertyListingsPageProps) {
  const searchParamsStore = await searchParams;
  const {
    search,
    emirate,
    propertyType,
    activityType,
    bedrooms,
    bathrooms,
    minPrice: minBudget,
    maxPrice: maxBudget,
    minSize,
    maxSize,
    sort = 'newest',
    page = '1',
  } = searchParamsStore;

  // Convert search params to API params
  const params: LeadFilterParams = {
    search: search?.toString(),
    emirate: emirate?.toString(),
    propertyType: propertyType?.toString(),
    activityType: activityType?.toString(),
    bedrooms: bedrooms?.toString(),
    bathrooms: bathrooms?.toString(),
    minBudget: minBudget?.toString(),
    maxBudget: maxBudget?.toString(),
    minSize: minSize?.toString(),
    maxSize: maxSize?.toString(),
    sort: sort?.toString(),
    page: page?.toString(),
    leadId: searchParamsStore.leadId?.toString(),
  };

  // Fetch leads with filters and sorting
  const response = (await getLeads(
    params
  )) as PaginatedResponse<App.Data.Lead.LeadListResponse>;

  return (
    <>
      <div className="min-h-screen">
        <div className="container">
          <div className="py-16 md:py-24">
            <div className="max-w-[90%] mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Property Listings
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with quality property owners and clients looking to sell
                or rent their properties across the UAE.
              </p>
            </div>
          </div>
        </div>

        <Filters />

        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {response.data.map((listing) => (
              <PropertyListingCard
                key={listing.id}
                listing={listing}
                searchParams={
                  new URLSearchParams(
                    Object.entries(searchParamsStore)
                      .filter(([_, value]) => value !== undefined)
                      .map(([key, value]) => [key, value!.toString()])
                  )
                }
              />
            ))}
            {response.data.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  No properties found matching your filters.
                </p>
              </div>
            )}
          </div>

          {response.data.length > 0 && (
            <div className="mt-8 flex justify-center">
              <LaravelPagination
                currentPage={response.current_page}
                lastPage={response.last_page}
                total={response.total}
              />
            </div>
          )}
        </div>
      </div>
      <ContactModal listings={response.data} />
    </>
  );
}
