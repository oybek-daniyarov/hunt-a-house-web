import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const splitInfoListQuery = groq`
  _type == "split-info-list" => {
    _key,
    _type,
    list[]{
      image{
        ${IMAGE_FRAGMENT}
      },
      title,
      body[]{
        ...,
        _type == "image" => {
          ${IMAGE_FRAGMENT}
        }
      },
      tags[],
    },
  },
`;
