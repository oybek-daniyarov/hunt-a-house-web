'use server';

import { PaginatedResponse } from '@/lib/client/laravel';
import { get, list, post } from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';
import { createUrl, routes } from '@/types/api-routes';

const PRODUCT_TAGS = ['leads'] as string[];

/**
 * Purchase a product (credits)
 */
export async function purchaseProduct(
  data: App.Data.Product.Payload.PurchasePayloadData
): Promise<ApiResult<App.Data.Product.Dto.PurchaseResponseData>> {
  try {
    const url = createUrl(routes['products.purchase']);
    const response = await post<
      ApiResult<App.Data.Product.Dto.PurchaseResponseData>
    >(url, data, PRODUCT_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function verifyPayment(
  sessionId: string
): Promise<App.Data.Product.Dto.PaymentSuccessData> {
  const url = createUrl(routes['products.verify-payment'], {
    session_id: sessionId,
  });
  return await get<App.Data.Product.Dto.PaymentSuccessData>(url, PRODUCT_TAGS);
}

export async function cancelPurchase(): Promise<
  ApiResult<{ success: boolean }>
> {
  try {
    const url = createUrl(routes['products.cancel']);
    const response = await get<ApiResult<{ success: boolean }>>(
      url,
      PRODUCT_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

type PaymentHistoryParams = {
  page?: number;
};

export async function getPaymentHistory(
  params: PaymentHistoryParams = {}
): Promise<PaginatedResponse<App.Data.Product.Dto.PaymentHistoryData>> {
  const url = createUrl(routes['products.payment-history'], {
    page: params.page ? parseInt(params.page.toString()) : 1,
  });
  return await list<App.Data.Product.Dto.PaymentHistoryData>(url, PRODUCT_TAGS);
}
