import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const logoCloud1Query = groq`
  _type == "logo-cloud-1" => {
    _key,
    _type,
    padding,
    colorVariant,
    title,
    images[]{
      ${IMAGE_FRAGMENT}
    },
  },
`;
