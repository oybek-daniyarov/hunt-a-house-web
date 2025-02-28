import { MapPin } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PropertyListingCardSkeleton() {
  return (
    <Card className="rounded-xl shadow-none border bg-card text-card-foreground bg-gradient-to-b from-muted/20 to-muted/10 transition-all dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-4 gap-5">
        <div className="space-y-4">
          {/* Property badges skeleton */}
          <div className="flex items-start justify-between text-xs">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-end flex-1">
          {/* Location skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Price skeleton */}
            <Skeleton className="h-5 w-1/2" />
          </div>

          {/* Features grid skeleton */}
          <div className="flex gap-3 items-center justify-between rounded-xl bg-muted/50 p-1.5 text-sm border border-border/40">
            <div className="flex flex-col items-center justify-center basis-1/2">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-8 mt-1" />
            </div>

            <div className="flex flex-col items-center justify-center basis-1/2 border-x border-border/40">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-8 mt-1" />
            </div>

            <div className="flex flex-col items-center justify-center basis-1/2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-8 mt-1" />
            </div>
          </div>

          {/* Contact methods skeleton */}
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>

          {/* Contact button skeleton */}
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
