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

export const IMAGE_FRAGMENT = groq`
    ...,
    "alt": coalesce(alt, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
    "dimensions": asset->metadata.dimensions,
    "mimeType": asset->mimeType,
`;
