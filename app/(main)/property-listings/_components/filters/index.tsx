import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';
import { PropertyListingFilters } from './property-listing-filters';
import { PropertyListingSelections } from './property-listing-selections';

export default async function Filters() {
  const filters = await getLeadFilters();

  return (
    <div className="sticky top-[54px] z-10 border-y bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <PropertyListingFilters filterData={filters} />
      </div>
      <PropertyListingSelections filterData={filters} />
    </div>
  );
}
