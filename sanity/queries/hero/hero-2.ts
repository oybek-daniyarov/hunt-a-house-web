import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT, LINK_QUERY } from '@/sanity/queries/shared';

export const hero2Query = groq`
  _type == "hero-2" => {
    _key,
    _type,
    height,
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
