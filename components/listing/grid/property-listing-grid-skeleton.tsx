import { PropertyListingCardSkeleton } from '@/components/listing/card/property-listing-card-skeleton';

type PropertyListingGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function PropertyListingGridSkeleton({
  count = 6,
  className = '',
}: PropertyListingGridSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <PropertyListingCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
