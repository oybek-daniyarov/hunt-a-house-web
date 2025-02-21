import { groq } from 'next-sanity';

import { LINK_QUERY } from '@/sanity/queries/shared';

export const hero1Query = groq`
  _type == "hero-1" => {
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
    image{
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
      },
      alt
    },
    links[]{ ${LINK_QUERY} },
  },
`;
