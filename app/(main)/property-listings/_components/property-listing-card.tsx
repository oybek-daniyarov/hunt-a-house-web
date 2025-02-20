import { BanknoteIcon, MapPin, SquareStack } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatSize } from '@/lib/utils/format-number';
import { ContactButton } from './contact-button';

interface PropertyListingCardProps {
  listing: App.Data.Lead.LeadListData;
  searchParams: URLSearchParams;
}

export function PropertyListingCard({
  listing,
  searchParams,
}: PropertyListingCardProps) {
  const formatBedrooms = (beds?: string) => {
    if (!beds) return 'N/A';
    return beds === '0' ? 'Studio' : beds;
  };

  const isStudio = listing.bedrooms === 0;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-none bg-gradient-to-b from-muted/80 to-muted/40 transition-all hover:shadow-lg dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-6 space-y-3">
          <div className="flex items-start justify-between text-xs">
            <Badge
              variant="secondary"
              className="px-2 py-0.5 text-xs font-medium"
            >
              {listing.propertyTypeName}
            </Badge>
            <Badge
              className={`bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 px-2 py-0.5 text-xs font-medium`}
            >
              {listing.activityTypeName}
            </Badge>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground/90">
              {listing.locations[0]?.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
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

          {listing.description && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {listing.description}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-4 rounded-lg bg-muted px-4 py-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {formatBedrooms(listing.bedrooms?.toString())}
              </span>
              {!isStudio && <span className="text-muted-foreground">Beds</span>}
            </div>
            <div className="h-4 w-px bg-border/60" />
            <div className="flex items-center gap-1">
              <span className="font-medium">{listing.bathrooms || 'N/A'}</span>
              <span className="text-muted-foreground">Baths</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <SquareStack className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Size</p>
              </div>
              <p className="text-base font-medium">
                {listing.minSize && listing.maxSize
                  ? `${formatSize(listing.minSize)} - ${formatSize(listing.maxSize)}`
                  : listing.minSize
                    ? formatSize(listing.minSize)
                    : 'Not specified'}
              </p>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Budget {listing.budgetFrequency}
                </p>
              </div>
              <p className="text-lg font-semibold text-foreground/90">
                {listing.minBudget && listing.maxBudget
                  ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
                  : listing.minBudget
                    ? formatCurrency(listing.minBudget)
                    : 'Not specified'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 border-t pt-5">
          <ContactButton
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            listing={listing}
            searchParams={searchParams}
          />
        </div>
      </CardContent>
    </Card>
  );
}
