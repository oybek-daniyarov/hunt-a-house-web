import { Suspense } from 'react';

import { ViewLead } from '@/components/ui/view-lead';
import { PageContainer, PageHeader, Section } from '../../_components';
import { LeadsTable } from './_components/leads-table';
import { LeadsTableSkeleton } from './_components/leads-table-skeleton';

export const metadata = {
  title: 'My Purchased Leads',
  description: 'View and manage your purchased property leads',
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; leadId?: string }>;
}) {
  const { page, leadId } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <PageContainer>
      <ViewLead leadId={leadId} returnUrl="/dashboard/agent/leads" />

      <PageHeader
        title="Leads"
        description="View and manage your purchased leads"
      />

      <Section>
        <Suspense fallback={<LeadsTableSkeleton />}>
          <LeadsTable page={pageNumber} />
        </Suspense>
      </Section>
    </PageContainer>
  );
}
