import { groq } from 'next-sanity';

import { splitCardsListQuery } from './split-cards-list';
import { splitContentQuery } from './split-content';
import { splitImageQuery } from './split-image';
import { splitInfoListQuery } from './split-info-list';

export const splitRowQuery = groq`
  _type == "split-row" => {
    _key,
    _type,
    padding,
    colorVariant,
    noGap,
    splitColumns[]{
      ${splitContentQuery}
      ${splitCardsListQuery}
      ${splitImageQuery}
      ${splitInfoListQuery}
    },
  },
`;
