'use server';

import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY } from '@/sanity/queries/page';

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Page> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};
