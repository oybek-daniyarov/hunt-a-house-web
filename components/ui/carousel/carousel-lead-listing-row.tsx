import { ShortListingCard } from '@/components/listing/card/short-listing-card';
import { ShortListingCardSkeleton } from '@/components/listing/card/short-listing-card-skeleton';
import { Marquee } from '@/components/ui/marquee';

interface CarouselLeadListingRowProps {
  leads?: App.Data.Lead.LeadListData[];
  isLoading?: boolean;
  skeletonCount?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: number;
}

export function CarouselLeadListingRow({
  leads = [],
  isLoading = false,
  skeletonCount = 5,
  pauseOnHover = true,
  reverse = false,
  speed = 50,
}: CarouselLeadListingRowProps) {
  const speedStyle = {
    '--duration': `${speed}s`,
  } as React.CSSProperties;

  return (
    <Marquee pauseOnHover={pauseOnHover} style={speedStyle} reverse={reverse}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <ShortListingCardSkeleton key={`skeleton-${index}`} />
          ))
        : leads.map((lead) => (
            <ShortListingCard key={lead.id} listing={lead} />
          ))}
    </Marquee>
  );
}
