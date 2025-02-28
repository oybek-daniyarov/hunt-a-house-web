import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const carousel1Query = groq`
  _type == "carousel-1" => {
    _key,
    _type,
    padding,
    colorVariant,
    size,
    orientation,
    indicators,
    images[]{
      ${IMAGE_FRAGMENT}
    },
  },
`;
