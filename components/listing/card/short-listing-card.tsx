'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LocationDisplay } from '@/components/listing/card/location-display';
import { PriceDisplay } from '@/components/listing/card/price-display';
import { PropertyBadges } from '@/components/listing/card/property-badges';
import { Card, CardContent } from '@/components/ui/card';

interface ShortListingCardProps {
  listing: App.Data.Lead.LeadListData;
}

export function ShortListingCard({ listing }: ShortListingCardProps) {
  const pathname = usePathname();

  return (
    <Link href={`/uae-property-listings/?listingId=${listing.id}`}>
      <Card className="rounded-xl shadow-none border bg-card text-card-foreground justify-center h-full w-[23rem]">
        <CardContent className="flex h-full flex-col  p-4">
          <div className="space-y-2">
            <PropertyBadges
              propertyTypeName={listing.propertyTypeName}
              activityTypeName={listing.activityTypeName}
            />

            {listing.description && (
              <p className="text-sm leading-tight text-foreground/90 line-clamp-1">
                {listing.description}
              </p>
            )}

            <PriceDisplay
              minBudget={listing.minBudget}
              maxBudget={listing.maxBudget}
              budgetFrequency={listing.budgetFrequency}
            />
            <LocationDisplay
              locations={listing.locations}
              max={3}
              className="line-clamp-1 space-x-1"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
