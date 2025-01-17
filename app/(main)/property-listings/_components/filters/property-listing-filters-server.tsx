import { getLeadFilters } from "@/lib/data/laravel/lead/lead.api"
import { PropertyListingFilters } from "./property-listing-filters"

export async function PropertyListingFiltersServer() {
  const filters = await getLeadFilters()

  
  return <PropertyListingFilters filterData={filters} />
}

export default PropertyListingFiltersServer 