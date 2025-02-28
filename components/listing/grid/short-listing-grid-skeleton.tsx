import { ShortListingCardSkeleton } from '@/components/listing/card/short-listing-card-skeleton';

type ShortListingGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function ShortListingGridSkeleton({
  count = 4,
  className = '',
}: ShortListingGridSkeletonProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ShortListingCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
