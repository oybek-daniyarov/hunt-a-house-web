import { groq } from 'next-sanity';

import { LINK_QUERY } from '@/sanity/queries/shared';

export const hero2Query = groq`
  _type == "hero-2" => {
    _type,
    height,
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
