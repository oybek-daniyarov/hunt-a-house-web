import { groq } from 'next-sanity';

import { IMAGE_FRAGMENT } from '@/sanity/queries/shared';

export const timelineQuery = groq`
  _type == "timeline-row" => {
    _key,
    _type,
    padding,
    colorVariant,
    timelines[]{
      title,
      tagLine,
      body[]{
        ...,
        _type == "image" => {
          ${IMAGE_FRAGMENT}
        }
      },
    },
  },
`;
