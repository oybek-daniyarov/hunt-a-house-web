import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT, LINK_QUERY } from '@/sanity/queries/shared';

export const cta1Query = groq`
  _type == "cta-1" => {
    _key,
    _type,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    body[]{
      ...,
      _type == "image" => {
        ${IMAGE_FRAGMENT}
      }
    },
    links[]{ ${LINK_QUERY} },
  },
`;
