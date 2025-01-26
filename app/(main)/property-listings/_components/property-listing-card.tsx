import { useSearchParams } from 'next/navigation';
import { BanknoteIcon, Clock, MapPin, SquareStack } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatSize } from '@/lib/utils/format-number';
import { ContactButton } from './contact-button';

interface PropertyListingCardProps {
  listing: App.Data.Lead.LeadListResponse;
  searchParams: URLSearchParams;
}

export function PropertyListingCard({
  listing,
  searchParams,
}: PropertyListingCardProps) {
  const formatBedrooms = (beds: string | null) => {
    if (!beds) return 'N/A';
    return beds === '0' ? 'Studio' : beds;
  };

  const isStudio = listing.bedrooms === '0';

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-none bg-gradient-to-b from-muted/80 to-muted/40 transition-all hover:shadow-lg dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-6 space-y-3">
          <div className="flex items-start justify-between text-xs">
            <Badge
              variant="secondary"
              className="px-2 py-0.5 text-xs font-medium"
            >
              {listing.property_type_name}
            </Badge>
            <Badge
              className={`bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 px-2 py-0.5 text-xs font-medium`}
            >
              {listing.activity_type_name}
            </Badge>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground/90">
              {listing.area_name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{listing.emirate_name}</span>
            </div>
          </div>

          {listing.description && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {listing.description}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-4 rounded-lg bg-muted/50 px-4 py-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {formatBedrooms(listing.bedrooms)}
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
                {listing.min_size && listing.max_size
                  ? `${formatSize(listing.min_size)} - ${formatSize(listing.max_size)}`
                  : listing.min_size
                    ? formatSize(listing.min_size)
                    : 'Not specified'}
              </p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Budget {listing.budget_frequency}
                </p>
              </div>
              <p className="text-lg font-semibold text-foreground/90">
                {listing.min_budget && listing.max_budget
                  ? `${formatCurrency(listing.min_budget)} - ${formatCurrency(listing.max_budget)}`
                  : listing.min_budget
                    ? formatCurrency(listing.min_budget)
                    : 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{listing.created_at}</span>
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
