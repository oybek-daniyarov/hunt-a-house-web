import { Suspense } from 'react';
import { Metadata } from 'next';

import LeadPurchasesHistory from '@/app/dashboard/agent/unlocks/lead-unlocked/_components/lead-purchases-history';
import { LeadPurchasesHistorySkeleton } from '@/app/dashboard/agent/unlocks/lead-unlocked/_components/lead-purchases-history-skeleton';
import { PageContainer, PageHeader, Section } from '../../../_components';

export const metadata: Metadata = {
  title: 'Unlocked Leads | HuntAHouse',
  description: 'View your unlocked leads history and transactions',
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
        title="Unlocked Leads"
        description="View your unlocked leads history and transactions"
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
