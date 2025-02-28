import { groq } from 'next-sanity';

export const formNewsletterQuery = groq`
  _type == "form-newsletter" => {
    _key,
    _type,
    padding,
    colorVariant,
    stackAlign,
    consentText,
    buttonText,
    successMessage,
  },
`;
