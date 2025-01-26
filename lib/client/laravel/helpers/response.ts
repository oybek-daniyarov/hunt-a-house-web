import { LaravelValidationError, ResponseError } from '../types';

export function createErrorResponse(
  message: string,
  status: number,
  errors?: LaravelValidationError['errors']
): { success: false; error: ResponseError } {
  return {
    success: false,
    error: {
      message,
      status,
      errors,
    },
  };
}

export function createSuccessResponse<T>(
  data?: T,
  redirect?: string
): { success: true; data?: T; redirect?: string } {
  return {
    success: true,
    ...(data && { data }),
    ...(redirect && { redirect }),
  };
}
