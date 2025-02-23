import { groq } from 'next-sanity';

export const contentQuery = groq`
  _type == "content" => {
    _type,
    _key,
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
    colorVariant,
    sectionWidth,
    padding,
  },
`;
