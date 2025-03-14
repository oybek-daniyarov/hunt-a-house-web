import { Suspense } from 'react';
import { Metadata } from 'next';

import LeadPurchasesHistory from '@/app/dashboard/agent/tokens/lead-purchases/_components/lead-purchases-history';
import { LeadPurchasesHistorySkeleton } from '@/app/dashboard/agent/tokens/lead-purchases/_components/lead-purchases-history-skeleton';
import { PageContainer, PageHeader, Section } from '../../../_components';

export const metadata: Metadata = {
  title: 'Lead Purchases | HuntAHouse',
  description: 'View your lead purchase history and transactions',
};

export default async function LeadPurchasesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams and parse page parameter
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  return (
    <PageContainer centered={false}>
      <PageHeader
        title="Lead Purchases"
        description="View your lead purchase history and transactions"
        textAlign="start"
      />

      <Section>
        <Suspense fallback={<LeadPurchasesHistorySkeleton />}>
          <LeadPurchasesHistory page={page} />
        </Suspense>
      </Section>
    </PageContainer>
  );
}
