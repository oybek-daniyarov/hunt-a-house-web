import { groq } from 'next-sanity';

export const LINK_QUERY = groq`
	...,
	internal->{ _type, title, "slug": slug.current }
`;

export const NAVIGATION_QUERY = groq`
	title,
	items[]{
		${LINK_QUERY},
		link{ ${LINK_QUERY} },
		links[]{ ${LINK_QUERY} }
	}
`;

export const CTA_QUERY = groq`
	...,
	link{ ${LINK_QUERY} }
`;
