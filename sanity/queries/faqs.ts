import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const faqsQuery = groq`
  _type == "faqs" => {
    _key,
    _type,
    padding,
    colorVariant,
    faqs[]->{
      _id,
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
