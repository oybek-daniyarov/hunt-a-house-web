import { stegaClean } from 'next-sanity';

import { ShortListingCard } from '@/components/listing/card/short-listing-card';
import { Marquee } from '@/components/ui/marquee';
import SectionContainer from '@/components/ui/section-container';
import { getLeads } from '@/lib/data/laravel/lead/lead.api';

interface CarouselLeadListingProps {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | 'primary'
    | 'secondary'
    | 'card'
    | 'accent'
    | 'destructive'
    | 'background'
    | 'transparent';
  speed: number;
  pauseOnHover: boolean;
}

export default async function CarouselLeadListing({
  padding,
  colorVariant,
  speed = 50,
  pauseOnHover = true,
}: Partial<CarouselLeadListingProps>) {
  const response = await getLeads();
  const color = stegaClean(colorVariant);
  const firstRow = response.data.slice(0, 5);
  const secondRow = response.data.slice(5, 10);
  const rows = [firstRow, secondRow].filter((row) => row.length > 0);
  const speedStyle = {
    '--duration': `${speed}s`,
  } as React.CSSProperties;

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        {rows.map((row, index) => (
          <Marquee
            key={index}
            pauseOnHover={pauseOnHover}
            style={speedStyle}
            reverse={index % 2 === 0}
          >
            {row.map((lead) => (
              <ShortListingCard key={lead.id} listing={lead} />
            ))}
          </Marquee>
        ))}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </SectionContainer>
  );
}
