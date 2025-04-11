import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PageContainer, PageHeader, Section } from '../../_components';
import PurchaseHistory from './components/purchase-history';

// Use dynamic import with loading fallback for components
const ProductsList = dynamic(() => import('./components/products-list'), {
  loading: () => <div className="h-40 rounded-lg bg-muted animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Unlocks | HuntAHouse',
  description: 'Purchase unlocks to access leads and grow your business',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams and parse page parameter
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  return (
    <PageContainer className="max-w-3xl" centered={false}>
      <PageHeader
        title="Unlocks"
        description="Purchase unlocks to access leads and grow your business"
        textAlign="start"
      />

      <Section title="Available Packages">
        <ProductsList />
      </Section>

      <Section
        title="Purchase History"
        headerRight={
          <Button variant="outline" asChild>
            <Link href="/dashboard/agent/tokens/lead-unlocked">
              View Unlocked Leads
            </Link>
          </Button>
        }
      >
        <PurchaseHistory page={page} />
      </Section>
    </PageContainer>
  );
}
