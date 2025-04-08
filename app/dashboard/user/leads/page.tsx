import { Suspense } from 'react';

import { PageContainer, PageHeader, Section } from '../../_components';
import { LeadsTable } from './_components/leads-table';
import { LeadsTableSkeleton } from './_components/leads-table-skeleton';

export const metadata = {
  title: 'My Leads',
  description: 'View and manage your property leads',
};

export default async function MyLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; edit?: string }>;
}) {
  const { page, edit } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <PageContainer>
      <PageHeader
        title="My Leads"
        description="View and manage your property leads"
      />
      <Section>
        <Suspense fallback={<LeadsTableSkeleton />}>
          <LeadsTable page={pageNumber} editLeadId={edit} />
        </Suspense>
      </Section>
    </PageContainer>
  );
}
