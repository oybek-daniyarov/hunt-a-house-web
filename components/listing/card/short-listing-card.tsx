import { LocationDisplay } from '@/components/listing/card/location-display';
import { PriceDisplay } from '@/components/listing/card/price-display';
import { PropertyBadges } from '@/components/listing/card/property-badges';
import { Card, CardContent } from '@/components/ui/card';

interface ShortListingCardProps {
  listing: App.Data.Lead.LeadListData;
}

export function ShortListingCard({ listing }: ShortListingCardProps) {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow h-full w-80">
      <CardContent className="flex h-full flex-col justify-center p-4">
        <div className="space-y-2">
          <PropertyBadges
            propertyTypeName={listing.propertyTypeName}
            activityTypeName={listing.activityTypeName}
          />

          {listing.description && (
            <p className="text-sm leading-relaxed text-foreground/90">
              {listing.description}
            </p>
          )}

          <LocationDisplay locations={listing.locations} />
          <PriceDisplay
            minBudget={listing.minBudget}
            maxBudget={listing.maxBudget}
            budgetFrequency={listing.budgetFrequency}
          />
        </div>
      </CardContent>
    </Card>
  );
}
