import { groq } from 'next-sanity';

export const gridPropertyListingQuery = groq`
  _type == "grid-property-listing" => {
    _type,
    _key,
    padding,
    colorVariant,
    gridColumns,
    perPage,
    filters {
      ...,
    },
    sortOptions[] {
      label,
      value,
    },
  },
`;
