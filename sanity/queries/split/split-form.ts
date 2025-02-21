import { groq } from 'next-sanity';

export const splitFormQuery = groq`
  _type == "split-form" => {
    _type,
    _key,
    formType,
    tagLine,
    title,
    body,
    link {
      _type,
      title,
      href,
      isExternal,
      variant,
    },
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
  },
`;
