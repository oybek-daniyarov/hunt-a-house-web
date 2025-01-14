import {PropertyListingCard} from "./_components/property-listing-card"
import {PropertyListingFilters} from "./_components/property-listing-filters"
import {PropertyListingSelections} from "./_components/property-listing-selections"
import {mockListings} from "./_data/mock-listings"

interface PropertyListingsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        sort = "newest"
    } = searchParamsStore

    // First filter the listings
    const filteredListings = mockListings.filter((listing) => {
        const matchesSearch = !search ||
            listing.area.toLowerCase().includes(search.toString().toLowerCase()) ||
            listing.city.toLowerCase().includes(search.toString().toLowerCase())

        const matchesEmirate = !emirate ||
            listing.emirate.toLowerCase() === emirate.toString().toLowerCase()

        const matchesPropertyType = !propertyType ||
            listing.propertyType.toLowerCase() === propertyType.toString().toLowerCase()

        const matchesActivityType = !activityType ||
            listing.activityType === activityType.toString()

        const matchesBedrooms = !bedrooms ||
            listing.bedrooms >= parseInt(bedrooms.toString())

        const matchesBathrooms = !bathrooms ||
            listing.bathrooms >= parseInt(bathrooms.toString())

        const matchesPrice = (!minPrice || listing.minBudget >= parseInt(minPrice.toString())) &&
            (!maxPrice || listing.maxBudget <= parseInt(maxPrice.toString()))

        const matchesSize = (!minSize || (listing.minSize || 0) >= parseInt(minSize.toString())) &&
            (!maxSize || (listing.maxSize || 0) <= parseInt(maxSize.toString()))

        return matchesSearch &&
            matchesEmirate &&
            matchesPropertyType &&
            matchesActivityType &&
            matchesBedrooms &&
            matchesBathrooms &&
            matchesPrice &&
            matchesSize
    })


    return (
        <div className="min-h-screen">
            <div className="container">
                <div className="py-16 md:py-24">
                    <div className="max-w-[90%] mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Property Listings
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Connect with quality property owners and clients looking to sell or rent their properties across the UAE.
                        </p>
                    </div>
                </div>
            </div>

            <div className="sticky top-[54px] z-10 border-y bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container py-4">
                    <PropertyListingFilters/>
                </div>
                <PropertyListingSelections/>
            </div>

            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredListings.map((listing) => (
                        <PropertyListingCard key={listing.id} listing={listing}/>
                    ))}
                    {filteredListings.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <p className="text-lg text-muted-foreground">
                                No properties found matching your filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 
