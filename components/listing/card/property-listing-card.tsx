import { MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ContactButton } from '@/components/ui/grid-property-listing/contact-button';
import { formatCurrency, formatSize } from '@/lib/utils/format-number';

interface PropertyListingCardProps {
  listing: App.Data.Lead.LeadListData;
}

export function PropertyListingCard({ listing }: PropertyListingCardProps) {
  const formatBedrooms = (beds?: string) => {
    if (!beds) return 'N/A';
    return beds === '0' ? 'Studio' : beds;
  };

  const isStudio = listing.bedrooms === 0;

  return (
    <Card className="rounded-xl border bg-card text-card-foreground  bg-gradient-to-b from-muted/40 to-muted/20 transition-all dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-4">
        <div className="mb-5 space-y-4">
          <div className="flex items-start justify-between text-xs">
            <Badge variant="secondary" size="sm">
              {listing.propertyTypeName}
            </Badge>
            <Badge
              size="sm"
              className={`bg-blue-500/10 text-blue-500 hover:bg-blue-500/20`}
            >
              {listing.activityTypeName}
            </Badge>
          </div>
          {listing.description && (
            <p className="text-muted-foreground line-clamp-2">
              {listing.description}
            </p>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">
                {listing.locations
                  .map((location) =>
                    location.breadcrumbs?.map((crumb) => crumb.name).join(' › ')
                  )
                  .join(' | ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div>
            {listing.minBudget && listing.maxBudget
              ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
              : listing.minBudget
                ? formatCurrency(listing.minBudget)
                : 'Price on request'}
            {listing.budgetFrequency && (
              <span className="ms-1 text-xs font-normal text-gray-600">
                /{listing.budgetFrequency.toLowerCase()}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-2 text-sm border border-border/40">
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">
                {formatBedrooms(listing.bedrooms?.toString())}
              </span>
              <span className="text-xs text-muted-foreground">
                {!isStudio ? 'Beds' : 'Studio'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center border-x border-border/40">
              <span className="font-semibold">
                {listing.bathrooms || 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground">Baths</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold">
                {listing.minSize
                  ? formatSize(listing.minSize).replace(' sq ft', '')
                  : 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground">Sq Ft</span>
            </div>
          </div>
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
