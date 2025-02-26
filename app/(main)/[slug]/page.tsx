import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs/server';

import Blocks from '@/components/blocks';
import { generatePageMetadata } from '@/lib/metadata';
import { fetchSanityPageBySlug } from '../actions';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return (
    <Blocks blocks={page?.blocks} searchParams={await props.searchParams} />
  );
}
