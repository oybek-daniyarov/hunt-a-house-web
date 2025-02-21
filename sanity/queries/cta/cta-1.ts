import { groq } from 'next-sanity';

import { LINK_QUERY } from '@/sanity/queries/shared';

export const cta1Query = groq`
  _type == "cta-1" => {
    _type,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    links[]{ ${LINK_QUERY} },
  },
`;
