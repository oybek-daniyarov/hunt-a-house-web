import { groq } from 'next-sanity';

import { gridCardQuery } from '@/sanity/queries/grid/grid-card';
import { gridPostQuery } from '@/sanity/queries/grid/grid-post';
import { pricingCardQuery } from '@/sanity/queries/grid/pricing-card';

export const gridRowQuery = groq`
  _type == "grid-row" => {
    _key,
    _type,
    padding,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardQuery}
      ${pricingCardQuery}
      ${gridPostQuery}
    },
  },
`;
