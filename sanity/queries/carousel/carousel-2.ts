import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const carousel2Query = groq`
  _type == "carousel-2" => {
    _key,
    _type,
    padding,
    colorVariant,
    testimonial[]->{
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
`;
