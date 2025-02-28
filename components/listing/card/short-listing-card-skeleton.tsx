import { MapPin } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ShortListingCardSkeleton() {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow h-full w-80">
      <CardContent className="flex h-full flex-col justify-center p-4">
        <div className="space-y-2">
          {/* Property badges skeleton */}
          <div className="flex items-start justify-between text-xs">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Price skeleton */}
          <Skeleton className="h-5 w-1/2" />

          {/* Location skeleton */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
