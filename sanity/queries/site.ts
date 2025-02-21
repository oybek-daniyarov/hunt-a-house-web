import { groq } from 'next-sanity';

import { CTA_QUERY, NAVIGATION_QUERY } from './shared';

export const SITE_QUERY = groq`
*[_type == 'site'][0]{
    ...,
    ctas[]{ ${CTA_QUERY} },
    headerMenu->{ ${NAVIGATION_QUERY} },
    footerMenu->{ ${NAVIGATION_QUERY} },
    social->{ ${NAVIGATION_QUERY} },
    'ogimage': ogimage.asset->url
}
`;
