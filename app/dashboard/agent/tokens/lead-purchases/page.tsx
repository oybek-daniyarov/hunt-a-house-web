import { Suspense } from 'react';
import { Metadata } from 'next';

import LeadPurchasesHistory from './_components/lead-purchases-history';
import { LeadPurchasesHistorySkeleton } from './_components/lead-purchases-history-skeleton';

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
    <section className="my-8 px-4">
      <div className="max-w-5xl space-y-8">
        <div className="text-center sm:text-start">
          <h1 className="text-2xl font-bold md:text-3xl">Lead Purchases</h1>
          <p className="text-muted-foreground">
            View your lead purchase history and transactions
          </p>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<LeadPurchasesHistorySkeleton />}>
            <LeadPurchasesHistory page={page} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
