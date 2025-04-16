import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PropertyListingCardSkeleton() {
  return (
    <Card className="rounded-xl shadow-none border bg-card text-card-foreground bg-gradient-to-b from-muted/20 to-muted/10 transition-all dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-4 gap-3">
        {/* Property badges and lock icon */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <Skeleton className="h-5 w-5" />
        </div>

        {/* Description and location */}
        <div className="space-y-1.5">
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          {/* Bed and bath */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-6" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-6" />
            </div>
          </div>

          {/* Price and square footage */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-6" />
            </div>
          </div>

          {/* Contact methods */}
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>

          {/* Contact button */}
          <Skeleton className="h-10 w-full mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}
