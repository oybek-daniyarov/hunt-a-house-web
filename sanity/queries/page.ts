import { groq } from 'next-sanity';

import { carousel1Query } from './carousel/carousel-1';
import { carousel2Query } from './carousel/carousel-2';
import { carousel3Query } from './carousel/carousel-3';
import { contentQuery } from './content';
import { cta1Query } from './cta/cta-1';
import { faqsQuery } from './faqs';
import { featuresQuery } from './features';
import { formNewsletterQuery } from './forms/newsletter';
import { gridPropertyListingQuery } from './grid/grid-property-listing';
import { gridRowQuery } from './grid/grid-row';
import { hero1Query } from './hero/hero-1';
import { hero2Query } from './hero/hero-2';
import { logoCloud1Query } from './logo-cloud/logo-cloud-1';
import { sectionHeaderQuery } from './section-header';
import { splitFormQuery } from './split/split-form';
import { splitRowQuery } from './split/split-row';
import { statsQuery } from './stats';
import { stepsQuery } from './steps';
import { timelineQuery } from './timeline';

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${hero1Query}
      ${hero2Query}
      ${sectionHeaderQuery}
      ${contentQuery}
      ${splitRowQuery}
      ${splitFormQuery}
      ${gridRowQuery}
      ${gridPropertyListingQuery}
      ${carousel1Query}
      ${carousel2Query}
      ${carousel3Query}
      ${timelineQuery}
      ${stepsQuery}
      ${statsQuery}
      ${featuresQuery}
      ${cta1Query}
      ${logoCloud1Query}
      ${faqsQuery}
      ${formNewsletterQuery}
    },
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
  }
`;
