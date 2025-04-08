import { Suspense } from 'react';
import { stegaClean } from 'next-sanity';
import { SearchParams } from 'nuqs/server';

import { CarouselLeadListingRow } from '@/components/ui/carousel/carousel-lead-listing-row';
import SectionContainer from '@/components/ui/section-container';
import { ViewLead } from '@/components/ui/view-lead';
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
  searchParams: SearchParams;
}

export default async function CarouselLeadListing({
  padding,
  colorVariant,
  speed = 50,
  pauseOnHover = true,
  searchParams,
}: CarouselLeadListingProps) {
  const color = stegaClean(colorVariant);

  console.log('leadId', searchParams);

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
      {searchParams?.leadId && (
        <ViewLead leadId={searchParams.leadId as string} />
      )}
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
