import { stegaClean } from 'next-sanity';

export const PAGE_TYPES = [
  'page',
  'author',
  'post',
  'testimonial',
  'category',
  'faq',
];

export const pageMap = {
  page: '/',
  author: '/authors/',
  post: '/blog/',
  testimonial: '/testimonials/',
  category: '/categories/',
};

export type PageType = keyof typeof pageMap;

export default function resolveUrl(
  type: PageType,
  slug: string,
  {
    base = true,
    params,
  }: {
    base?: boolean;
    params?: string;
  } = {}
) {
  const segment = pageMap[type as PageType];
  const path = slug === 'index' ? null : slug;

  return [
    base && process.env.NEXT_PUBLIC_BASE_URL,
    segment,
    path,
    stegaClean(params),
  ]
    .filter(Boolean)
    .join('');
}
