import { Suspense } from 'react';
import { stegaClean } from 'next-sanity';

import { CarouselLeadListingRow } from '@/components/ui/carousel/carousel-lead-listing-row';
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
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Suspense
          fallback={<LoadingRows speed={speed} pauseOnHover={pauseOnHover} />}
        >
          <LeadRows speed={speed} pauseOnHover={pauseOnHover} />
        </Suspense>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </SectionContainer>
  );
}

async function LeadRows({
  speed,
  pauseOnHover,
}: {
  speed: number;
  pauseOnHover: boolean;
}) {
  const response = await getLeads();
  const firstRow = response.data.slice(0, 5);
  const secondRow = response.data.slice(5, 10);
  const rows = [firstRow, secondRow].filter((row) => row.length > 0);

  return (
    <>
      {rows.map((row, index) => (
        <CarouselLeadListingRow
          key={index}
          leads={row}
          pauseOnHover={pauseOnHover}
          speed={speed}
          reverse={index % 2 === 0}
        />
      ))}
    </>
  );
}

function LoadingRows({
  speed,
  pauseOnHover,
}: {
  speed: number;
  pauseOnHover: boolean;
}) {
  return (
    <>
      <CarouselLeadListingRow
        isLoading
        pauseOnHover={pauseOnHover}
        speed={speed}
        reverse={true}
      />
      <CarouselLeadListingRow
        isLoading
        pauseOnHover={pauseOnHover}
        speed={speed}
        reverse={false}
      />
    </>
  );
}
