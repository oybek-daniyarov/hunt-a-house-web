import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ShortListingCardSkeleton() {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow h-full w-[24rem]">
      <CardContent className="flex h-full flex-col p-4">
        <div className="space-y-2">
          {/* Property badges skeleton */}
          <div className="flex items-start justify-between text-xs">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>

          {/* Description skeleton */}
          <Skeleton className="h-4 w-full" />

          {/* Price skeleton */}
          <Skeleton className="h-5 w-1/2" />

          {/* Location skeleton */}
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
