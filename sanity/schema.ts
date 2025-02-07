import { type SchemaTypeDefinition } from 'sanity';

import carousel1 from './schemas/blocks/carousel/carousel-1';
import carousel2 from './schemas/blocks/carousel/carousel-2';
import carousel3 from './schemas/blocks/carousel/carousel-3';
import cta1 from './schemas/blocks/cta/cta-1';
import faqs from './schemas/blocks/faqs';
import newsletter from './schemas/blocks/forms/newsletter';
import gridCard from './schemas/blocks/grid/grid-card';
import gridPost from './schemas/blocks/grid/grid-post';
import gridRow from './schemas/blocks/grid/grid-row';
import pricingCard from './schemas/blocks/grid/pricing-card';
// Schema UI objects
import hero1 from './schemas/blocks/hero/hero-1';
import hero2 from './schemas/blocks/hero/hero-2';
import logoCloud1 from './schemas/blocks/logo-cloud/logo-cloud-1';
import sectionHeader from './schemas/blocks/section-header';
// Schema UI shared objects
import blockContent from './schemas/blocks/shared/block-content';
import { buttonVariant } from './schemas/blocks/shared/button-variant';
import { colorVariant } from './schemas/blocks/shared/color-variant';
import link from './schemas/blocks/shared/link';
import sectionPadding from './schemas/blocks/shared/section-padding';
import splitCard from './schemas/blocks/split/split-card';
import splitCardsList from './schemas/blocks/split/split-cards-list';
import splitContent from './schemas/blocks/split/split-content';
import splitImage from './schemas/blocks/split/split-image';
import splitInfo from './schemas/blocks/split/split-info';
import splitInfoList from './schemas/blocks/split/split-info-list';
import splitRow from './schemas/blocks/split/split-row';
import timelineRow from './schemas/blocks/timeline/timeline-row';
import timelinesOne from './schemas/blocks/timeline/timelines-1';
import agent from './schemas/documents/agent';
import author from './schemas/documents/author';
import category from './schemas/documents/category';
import faq from './schemas/documents/faq';
// documents
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
    // shared objects
    blockContent,
    link,
    colorVariant,
    buttonVariant,
    sectionPadding,
    // blocks
    hero1,
    hero2,
    sectionHeader,
    splitRow,
    splitContent,
    splitCardsList,
    splitCard,
    splitImage,
    splitInfoList,
    splitInfo,
    gridCard,
    pricingCard,
    gridPost,
    gridRow,
    carousel1,
    carousel2,
    carousel3,
    timelineRow,
    timelinesOne,
    cta1,
    logoCloud1,
    faqs,
    newsletter,
  ],
};
