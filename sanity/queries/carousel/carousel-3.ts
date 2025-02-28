import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const carousel3Query = groq`
  _type == "carousel-3" => {
    _key,
    _type,
    padding,
    colorVariant,
    speed,
    pauseOnHover,
    rows[]{
      testimonials[]->{
        _id,
        name,
        title,
        image{
          ${IMAGE_FRAGMENT}
        },
        body[]{
          ...,
          _type == "image" => {
            ${IMAGE_FRAGMENT}
          }
        },
        rating,
      },
    },
  },
`;
