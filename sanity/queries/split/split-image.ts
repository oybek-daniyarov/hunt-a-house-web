import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const splitImageQuery = groq`
  _type == "split-image" => {
    _key,
    _type,
    image{
      ${IMAGE_FRAGMENT}
    },
  },
`;
