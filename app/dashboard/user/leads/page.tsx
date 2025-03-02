import { Suspense } from 'react';

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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold">My Leads</h1>
        <p className="mt-2 text-gray-600">
          View and manage your property leads
        </p>
      </div>

      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable page={pageNumber} editLeadId={edit} />
      </Suspense>
    </div>
  );
}
