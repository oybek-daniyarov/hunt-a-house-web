import { type SchemaTypeDefinition } from 'sanity';

// Schema UI shared objects
// documents
import navigation from '@/sanity/schemas/documents/navigation';
import site from '@/sanity/schemas/documents/site';
import announcement from '@/sanity/schemas/objects/announcement';
import cta from '@/sanity/schemas/objects/cta';
import link from '@/sanity/schemas/objects/link';
import linkList from '@/sanity/schemas/objects/link.list';
import logo from '@/sanity/schemas/objects/logo';
import carousel1 from './schemas/blocks/carousel/carousel-1';
import carousel2 from './schemas/blocks/carousel/carousel-2';
import carousel3 from './schemas/blocks/carousel/carousel-3';
import content from './schemas/blocks/content';
import cta1 from './schemas/blocks/cta/cta-1';
import faqs from './schemas/blocks/faqs';
import features from './schemas/blocks/features';
import newsletter from './schemas/blocks/forms/newsletter';
import gridCard from './schemas/blocks/grid/grid-card';
import gridPost from './schemas/blocks/grid/grid-post';
import gridPropertyListing from './schemas/blocks/grid/grid-property-listing';
import gridRow from './schemas/blocks/grid/grid-row';
import pricingCard from './schemas/blocks/grid/pricing-card';
// Schema UI objects
import hero1 from './schemas/blocks/hero/hero-1';
import hero2 from './schemas/blocks/hero/hero-2';
import logoCloud1 from './schemas/blocks/logo-cloud/logo-cloud-1';
import sectionHeader from './schemas/blocks/section-header';
import blockContent from './schemas/blocks/shared/block-content';
import { buttonVariant } from './schemas/blocks/shared/button-variant';
import { colorVariant } from './schemas/blocks/shared/color-variant';
import sectionPadding from './schemas/blocks/shared/section-padding';
import splitCard from './schemas/blocks/split/split-card';
import splitCardsList from './schemas/blocks/split/split-cards-list';
import splitContent from './schemas/blocks/split/split-content';
import splitForm from './schemas/blocks/split/split-form';
import splitImage from './schemas/blocks/split/split-image';
import splitInfo from './schemas/blocks/split/split-info';
import splitInfoList from './schemas/blocks/split/split-info-list';
import splitRow from './schemas/blocks/split/split-row';
import stats from './schemas/blocks/stats';
import steps from './schemas/blocks/steps';
import timelineRow from './schemas/blocks/timeline/timeline-row';
import timelinesOne from './schemas/blocks/timeline/timelines-1';
import agent from './schemas/documents/agent';
import author from './schemas/documents/author';
import category from './schemas/documents/category';
import faq from './schemas/documents/faq';
import page from './schemas/documents/page';
import post from './schemas/documents/post';
import testimonial from './schemas/documents/testimonial';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    post,
    author,
    category,
    faq,
    testimonial,
    agent,
    navigation,
    site,
    // shared objects
    blockContent,
    colorVariant,
    buttonVariant,
    sectionPadding,
    // blocks
    hero1,
    hero2,
    sectionHeader,
    content,
    splitRow,
    splitContent,
    splitCardsList,
    splitCard,
    splitImage,
    splitInfoList,
    splitInfo,
    splitForm,
    gridCard,
    pricingCard,
    gridPost,
    gridRow,
    gridPropertyListing,
    carousel1,
    carousel2,
    carousel3,
    timelineRow,
    timelinesOne,
    cta1,
    logoCloud1,
    faqs,
    newsletter,
    steps,
    stats,
    features,

    //objects
    link,
    linkList,
    cta,
    announcement,
    logo,
  ],
};
