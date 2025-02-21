import { groq } from 'next-sanity';

export const stepsQuery = groq`
  _type == "steps" => {
    _type,
    _key,
    title,
    subtitle,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    steps[] {
      title,
      description,
    }
  },
`;
