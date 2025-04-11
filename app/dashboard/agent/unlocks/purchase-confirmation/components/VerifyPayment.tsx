import { verifyPayment } from '@/lib/data/laravel/product/product.api';
import { ErrorCard } from './ErrorCard';
import { SuccessCard } from './SuccessCard';

interface VerifyPaymentProps {
  sessionId: string;
}

export async function VerifyPayment({ sessionId }: VerifyPaymentProps) {
  let paymentData: App.Data.Product.Dto.PaymentSuccessData | null = null;
  let error: string | null = null;
  let success = false;

  try {
    // Fetch payment data on the server
    paymentData = await verifyPayment(sessionId);
    success = paymentData.success;
    if (!success && paymentData.error) {
      error = paymentData.error;
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    success = false;
    error = 'Failed to verify payment. Please contact support.';
  }

  // If there was an error, show the error UI
  if (!success || !paymentData) {
    return (
      <ErrorCard
        title="Payment Failed"
        description="There was an issue with your payment"
        errorMessage={
          error ||
          'There was an issue verifying your payment. Please contact support for assistance.'
        }
      />
    );
  }

  // If payment was successful, show the success UI
  return <SuccessCard paymentData={paymentData} />;
}
