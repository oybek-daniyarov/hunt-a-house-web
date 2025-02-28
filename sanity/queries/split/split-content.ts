import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const splitContentQuery = groq`
  _type == "split-content" => {
    _key,
    _type,
    sticky,
    padding,
    colorVariant,
    tagLine,
    title,
    body[]{
      ...,
      _type == "image" => {
        ${IMAGE_FRAGMENT}
      }
    },
    link,
  },
`;
