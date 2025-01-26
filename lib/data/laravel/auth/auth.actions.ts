'use server';

import { deleteToken, setToken } from '@/lib/client/laravel/cookies';
import {
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/client/laravel/helpers/response';
import { ActionResponse } from '@/lib/client/laravel/types';
import { env } from '@/lib/env';
import * as authApi from './auth.api';

export async function registerAction(
  data: App.Data.Auth.RegisterData
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
      encryptionKey: env.ENCRYPTION_KEY!,
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
    encryptionKey: env.ENCRYPTION_KEY!,
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

export async function resetPasswordAction(
  data: App.Data.Auth.ResetPasswordData
) {
  const response = await authApi.resetPassword(data);
  if (!response.success) {
    return createErrorResponse(
      response.error?.message || 'Reset password failed',
      422,
      response.error?.errors
    );
  }
  return createSuccessResponse(response.data, '/dashboard');
}

export async function logoutAction() {
  const response = await authApi.logout();
  if (!response.success) {
    return createErrorResponse(
      response.error?.message || 'Logout failed',
      422,
      response.error?.errors
    );
  }
  await deleteToken();
  return createSuccessResponse(response.data, '/login');
}
