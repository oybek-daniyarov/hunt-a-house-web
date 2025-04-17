import { Suspense } from 'react';

import { verifyPayment } from '@/lib/data/laravel/product/product.api';
import { ErrorCard, LoadingState, SuccessCard } from './components';

// This is a Server Component that fetches data on the server
export default async function PurchaseConfirmation({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  // If no session ID is provided, show an error
  if (!sessionId) {
    return (
      <ErrorCard errorMessage="No session ID provided. Unable to verify payment." />
    );
  }

  const response = await verifyPayment(sessionId);

  return (
    <Suspense fallback={<LoadingState />}>
      {response.success && response.success ? (
        <SuccessCard paymentData={response} />
      ) : response.success === false && response.error ? (
        <ErrorCard errorMessage={response.error} />
      ) : (
        <ErrorCard errorMessage="Unable to verify payment." />
      )}
    </Suspense>
  );
}
