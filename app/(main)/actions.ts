'use server';

import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY } from '@/sanity/queries/page';
import { SITE_QUERY } from '@/sanity/queries/site';

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

export const fetchSanitySite = async (): Promise<Sanity.Site> => {
  const { data } = await sanityFetch({
    query: SITE_QUERY,
    tags: ['site'],
  });

  if (!data)
    throw new Error(
      'Missing Site settings: 🫠 Your website might be having an identity crisis...\n\n' +
        'Solution: Publish the Site document in your Sanity Studio.\n\n' +
        '💁‍♂️ https://sanitypress.dev/docs/errors#missing-site-settings'
    );

  return data;
};
