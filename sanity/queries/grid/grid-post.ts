import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const gridPostQuery = groq`
  _type == "grid-post" => {
    _key,
    _type,
    ...post->{
      title,
      slug,
      excerpt,
      image{
        ${IMAGE_FRAGMENT}
      },
      categories[]->{
        title,
        _id,
      },
    },
  },
`;
