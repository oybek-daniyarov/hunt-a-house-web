import { groq } from 'next-sanity';

export const statsQuery = groq`
  _type == "stats" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    stats[] {
      prefix,
      value,
      suffix,
      label
    }
  },
`;
