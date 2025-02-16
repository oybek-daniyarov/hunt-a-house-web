import { LaravelValidationError } from '../types';

export type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: LaravelValidationError;
};

export async function handleApiResponse<T, R>(
  apiCall: () => Promise<R>,
  transform?: (data: R) => T
): Promise<ApiResult<T>> {
  try {
    const response = await apiCall();
    return {
      success: true,
      data: transform ? transform(response) : (response as T),
    };
  } catch (error) {
    if (error instanceof Error && error.cause) {
      return {
        success: false,
        error: error.cause as LaravelValidationError,
      };
    }

    return {
      success: false,
      error: {
        message: 'An unexpected error occurred',
      },
    };
  }
}
