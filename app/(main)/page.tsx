import { SearchParams } from 'nuqs/server';

import Blocks from '@/components/blocks';
import MissingSanityPage from '@/components/ui/missing-sanity-page';
import { generatePageMetadata } from '@/lib/metadata';
import { fetchSanityPageBySlug } from './actions';

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: 'index' });

  return generatePageMetadata({ page, slug: 'index' });
}

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function IndexPage(props: Props) {
  const page = await fetchSanityPageBySlug({ slug: 'index' });
  const searchParams = await props.searchParams;

  if (!page) {
    return MissingSanityPage({ document: 'page', slug: 'index' });
  }

  return <Blocks blocks={page?.blocks} searchParams={searchParams} />;
}
