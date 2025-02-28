import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const contentQuery = groq`
  _type == "content" => {
    _key,
    _type,
    _key,
    body[]{
      ...,
      _type == "image" => {
        ${IMAGE_FRAGMENT}
      }
    },
    colorVariant,
    sectionWidth,
    padding,
  },
`;
