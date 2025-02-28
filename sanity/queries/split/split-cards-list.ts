import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const splitCardsListQuery = groq`
  _type == "split-cards-list" => {
    _key,
    _type,
    list[]{
      tagLine,
      title,
      body[]{
        ...,
        _type == "image" => {
          ${IMAGE_FRAGMENT}
        }
      },
    },
  },
`;
