'use server';

import { deleteToken, setToken } from '@/lib/client/laravel/cookies';
import {
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/client/laravel/helpers/response';
import { ActionResponse } from '@/lib/client/laravel/types';
import * as authApi from './auth.api';

export async function registerAction(
  data: App.Data.Auth.Payload.RegisterPayloadData
): Promise<ActionResponse<App.Data.User.UserData>> {
  try {
    const response = await authApi.register(data);

    if (!response.success) {
      return createErrorResponse(
        response.error?.message || 'Registration failed',
        422,
        response.error?.errors
      );
    }

    await setToken({
      token: response.data?.token || '',
    });

    return createSuccessResponse(response.data?.user, '/dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    return createErrorResponse('An unexpected error occurred', 500);
  }
}

export async function loginAction(
  data: App.Data.Auth.Payload.LoginPayloadData
) {
  const response = await authApi.login(data);
  if (!response.success) {
    return createErrorResponse(
      response.error?.message || 'Login failed',
      422,
      response.error?.errors
    );
  }

  await setToken({
    token: response.data?.token || '',
  });
  return createSuccessResponse(response.data?.user, '/dashboard');
}

export async function forgotPasswordAction(
  data: App.Data.Auth.Payload.ForgotPasswordPayloadData
) {
  const response = await authApi.forgotPassword(data);
  if (!response.success) {
    return createErrorResponse(
      response.error?.message || 'Forgot password failed',
      422,
      response.error?.errors
    );
  }
  return createSuccessResponse(response.data, '/dashboard');
}

export async function logoutAction() {
  try {
    // First try to delete the token locally
    await deleteToken();

    // Then try to logout from the backend
    const response = await authApi.logout();
    if (!response.success) {
      console.warn(
        'Backend logout failed, but token was deleted locally:',
        response.error
      );
    }

    // Return success even if backend fails, as we've deleted the token locally
    return createSuccessResponse(null, '/login');
  } catch (error) {
    console.error('Logout failed:', error);
    // Still try to redirect to login even if there's an error
    return createSuccessResponse(null, '/login');
  }
}
