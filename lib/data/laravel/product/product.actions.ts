'use server';

import { revalidateAuthTag } from '@/lib/actions/auth-actions';
import { createErrorResponse } from '@/lib/client/laravel';
import { createSuccessResponse } from '@/lib/client/laravel/helpers';
import { cancelPurchase, purchaseProduct, verifyPayment } from './product.api';

/**
 * Server action to purchase a product
 * This returns the checkout URL to the client for redirection
 */
export async function purchaseProductAction(
  data: App.Data.Product.Payload.PurchasePayloadData
) {
  try {
    const response = await purchaseProduct(data);

    if (!response.success) {
      return createErrorResponse(
        response.error?.message || 'Purchase failed',
        422,
        response.error?.errors
      );
    }

    // Return the checkout URL for client-side redirect
    return createSuccessResponse(response.data);
  } catch (error) {
    console.error('Product purchase API error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Purchase failed',
      500
    );
  }
}

/**
 * Server action to verify a payment
 */
export async function verifyPaymentAction(sessionId: string) {
  try {
    const response = await verifyPayment(sessionId);

    if (!response.success) {
      return createErrorResponse(
        response.error || 'Payment verification failed',
        422
      );
    }

    return createSuccessResponse(response, '/dashboard/products');
  } catch (error) {
    console.error('Payment verification API error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Payment verification failed',
      500
    );
  }
}

/**
 * Server action to cancel a purchase
 */
export async function cancelPurchaseAction() {
  try {
    const response = await cancelPurchase();

    if (!response.success) {
      return createErrorResponse(
        response.error?.message || 'Cancel purchase failed',
        422,
        response.error?.errors
      );
    }

    // Revalidate auth tag to update user data (credits)
    await revalidateAuthTag();

    return createSuccessResponse(null, '/dashboard/products');
  } catch (error) {
    console.error('Cancel purchase API error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Cancel purchase failed',
      500
    );
  }
}
