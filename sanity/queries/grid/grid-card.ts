import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const gridCardQuery = groq`
  _type == "grid-card" => {
    _key,
    _type,
    title,
    excerpt,
    image{
      ${IMAGE_FRAGMENT}
    },
    link,
  },
`;
