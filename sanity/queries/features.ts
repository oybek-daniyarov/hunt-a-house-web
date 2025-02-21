import { groq } from 'next-sanity';

export const featuresQuery = groq`
  _type == "features" => {
    _type,
    _key,
    title,
    subtitle,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    features[] {
      title,
      subtitle,
      description,
      icon
    }
  },
`;
