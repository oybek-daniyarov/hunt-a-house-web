import { groq } from 'next-sanity';

export const carouselLeadListingQuery = groq`
  _type == "carousel-lead-listing" => {
    _key,
    _type,
    padding,
    colorVariant,
    speed,
    pauseOnHover,
  },
`;
