import { Suspense } from 'react';

import { ErrorCard, LoadingState, VerifyPayment } from './components';

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

  // Wrap the data fetching in a try/catch block and use Suspense for loading state
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyPayment sessionId={sessionId} />
    </Suspense>
  );
}
