'use server';

import client from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';
import { createUrl, routes } from '@/types/api-routes';

const AUTH_TAGS = ['auth', 'user'] as string[];

export async function register(
  data: App.Data.Auth.RegisterData
): Promise<ApiResult<App.Data.Auth.RegisterData>> {
  const url = createUrl(routes['auth.register']);
  return handleApiResponse(() =>
    client.post<App.Data.Auth.RegisterData>(url, data, AUTH_TAGS)
  );
}

export async function login(
  data: App.Data.Auth.Payload.LoginPayloadData
): Promise<ApiResult<App.Data.Auth.LoginData>> {
  const url = createUrl(routes['auth.login']);
  return handleApiResponse(() =>
    client.post<App.Data.Auth.LoginData>(url, data, AUTH_TAGS)
  );
}

export async function forgotPassword(
  data: App.Data.Auth.Payload.ForgotPasswordPayloadData
): Promise<ApiResult<void>> {
  const url = createUrl(routes['auth.forgot-password']);
  return handleApiResponse(() => client.post<void>(url, data, AUTH_TAGS));
}

export async function resetPassword(
  data: App.Data.Auth.Payload.ResetPasswordPayloadData
): Promise<ApiResult<App.Data.Auth.ResetPasswordData>> {
  const url = createUrl(routes['auth.reset-password']);
  return handleApiResponse(() =>
    client.post<App.Data.Auth.ResetPasswordData>(url, data, AUTH_TAGS)
  );
}

export async function logout(): Promise<ApiResult<void>> {
  const url = createUrl(routes['auth.logout']);
  return handleApiResponse(() => client.delete<void>(url, AUTH_TAGS));
}

export async function getCurrentUser(): Promise<
  ApiResult<App.Data.User.UserData>
> {
  const url = createUrl(routes['auth.user']);
  return handleApiResponse(() =>
    client.get<App.Data.User.UserData>(url, AUTH_TAGS)
  );
}
