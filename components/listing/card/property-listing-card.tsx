import { Card, CardContent } from '@/components/ui/card';
import { ContactButton } from '@/components/ui/grid-property-listing/contact-button';
import { LocationDisplay } from './location-display';
import { PriceDisplay } from './price-display';
import { PropertyBadges } from './property-badges';
import { PropertyFeaturesGrid } from './property-features-grid';

interface PropertyListingCardProps {
  listing: App.Data.Lead.LeadListData;
}

export function PropertyListingCard({ listing }: PropertyListingCardProps) {
  return (
    <Card className="rounded-xl shadow-none border bg-card text-card-foreground  bg-gradient-to-b from-muted/20 to-muted/10 transition-all dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-4">
        <div className="mb-5 space-y-4">
          <PropertyBadges
            propertyTypeName={listing.propertyTypeName}
            activityTypeName={listing.activityTypeName}
          />

          {listing.description && (
            <p className="text-muted-foreground line-clamp-2">
              {listing.description}
            </p>
          )}

          <div className="space-y-2">
            <LocationDisplay locations={listing.locations} />
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <PriceDisplay
            minBudget={listing.minBudget}
            maxBudget={listing.maxBudget}
            budgetFrequency={listing.budgetFrequency}
          />

          <PropertyFeaturesGrid
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            minSize={listing.minSize}
          />
        </div>

        <div className="mt-6 border-t pt-6">
          <ContactButton
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            listing={listing}
          />
        </div>
      </CardContent>
    </Card>
  );
}
