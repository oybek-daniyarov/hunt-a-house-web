import { FaMapMarkerAlt } from 'react-icons/fa';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/format-number';

interface ShortListingCardProps {
  listing: App.Data.Lead.LeadListData;
}

export function ShortListingCard({ listing }: ShortListingCardProps) {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow h-full w-80">
      <CardContent className="flex h-full flex-col justify-center p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between text-xs">
            <Badge size="sm" variant="secondary">
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
            <p className="text-sm leading-relaxed text-foreground/90">
              {listing.description}
            </p>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FaMapMarkerAlt className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="line-clamp-1">
                {listing.locations
                  .map((location) =>
                    location.breadcrumbs?.map((crumb) => crumb.name).join(' › ')
                  )
                  .join(' | ')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-between">
            <p className="text-sm font-semibold text-foreground/90">
              {listing.minBudget && listing.maxBudget
                ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
                : listing.minBudget
                  ? formatCurrency(listing.minBudget)
                  : 'Not specified'}
            </p>
            <Badge size="sm">{listing.budgetFrequency}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
