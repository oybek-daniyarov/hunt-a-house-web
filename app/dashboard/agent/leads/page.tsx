import { Suspense } from 'react';

import { ViewLead } from '@/components/ui/view-lead';
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
    <div className="flex flex-col gap-6">
      <ViewLead leadId={leadId} returnUrl="/dashboard/agent/leads" />

      <div>
        <h1 className="text-4xl font-bold">Leads</h1>
        <p className="mt-2 text-gray-600">
          View and manage your purchased leads
        </p>
      </div>

      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable page={pageNumber} />
      </Suspense>
    </div>
  );
}
