import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT, LINK_QUERY } from '@/sanity/queries/shared';

export const hero1Query = groq`
  _type == "hero-1" => {
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
    image{
      ${IMAGE_FRAGMENT}
    },
    links[]{ ${LINK_QUERY} },
  },
`;
