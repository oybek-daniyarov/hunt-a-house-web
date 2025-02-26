import { ComponentType } from 'react';
import { SearchParams } from 'nuqs/server';

import Carousel1 from '@/components/ui/carousel/carousel-1';
import Carousel2 from '@/components/ui/carousel/carousel-2';
import Carousel3 from '@/components/ui/carousel/carousel-3';
import Content from '@/components/ui/content';
import Cta1 from '@/components/ui/cta/cta-1';
import FAQs from '@/components/ui/faqs';
import Features from '@/components/ui/features';
import FormNewsletter from '@/components/ui/forms/newsletter';
import GridPropertyListing from '@/components/ui/grid-property-listing';
import GridRow from '@/components/ui/grid/grid-row';
import Hero1 from '@/components/ui/hero/hero-1';
import Hero2 from '@/components/ui/hero/hero-2';
import LogoCloud1 from '@/components/ui/logo-cloud/logo-cloud-1';
import SectionHeader from '@/components/ui/section-header';
import SplitForm from '@/components/ui/split/split-form';
import SplitRow from '@/components/ui/split/split-row';
import Stats from '@/components/ui/stats';
import Steps from '@/components/ui/steps';
import TimelineRow from '@/components/ui/timeline/timeline-row';

const componentMap: { [key: string]: ComponentType<any> } = {
  'hero-1': Hero1,
  'hero-2': Hero2,
  'section-header': SectionHeader,
  content: Content,
  'split-row': SplitRow,
  'split-form': SplitForm,
  'grid-row': GridRow,
  'grid-property-listing': GridPropertyListing,
  'carousel-1': Carousel1,
  'carousel-2': Carousel2,
  'carousel-3': Carousel3,
  'timeline-row': TimelineRow,
  'cta-1': Cta1,
  'logo-cloud-1': LogoCloud1,
  faqs: FAQs,
  'form-newsletter': FormNewsletter,
  steps: Steps,
  stats: Stats,
  features: Features,
};

type BlocksProps = {
  blocks?: Sanity.Block[];
  searchParams: SearchParams;
};

export default function Blocks({ blocks, searchParams }: BlocksProps) {
  return blocks?.map((block: Sanity.Block) => {
    const Component = componentMap[block._type];
    if (!Component) {
      // Fallback for unknown block types to debug
      return <div data-type={block._type} key={block._key} />;
    }
    return (
      <Component {...block} key={block._key} searchParams={searchParams} />
    );
  });
}
