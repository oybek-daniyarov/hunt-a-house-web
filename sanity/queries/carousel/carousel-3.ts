import { groq } from "next-sanity";

export const carousel3Query = groq`
  _type == "carousel-3" => {
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
        rating,
      },
    },
  },
`; 