'use server';

import { del, get, post } from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';
import { createUrl, routes } from '@/types/api-routes';

const AUTH_TAGS = ['auth', 'user'] as string[];

export async function register(
  data: App.Data.Auth.Payload.RegisterPayloadData
): Promise<ApiResult<App.Data.Auth.RegisterData>> {
  try {
    const url = createUrl(routes['auth.register']);
    const response = await post<ApiResult<App.Data.Auth.RegisterData>>(
      url,
      data,
      AUTH_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function login(
  data: App.Data.Auth.Payload.LoginPayloadData
): Promise<ApiResult<App.Data.Auth.LoginData>> {
  try {
    const url = createUrl(routes['auth.login']);
    const response = await post<ApiResult<App.Data.Auth.LoginData>>(
      url,
      data,
      AUTH_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function forgotPassword(
  data: App.Data.Auth.Payload.ForgotPasswordPayloadData
): Promise<ApiResult<null>> {
  try {
    const url = createUrl(routes['auth.forgot-password']);
    const response = await post<ApiResult<null>>(url, data, AUTH_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function resetPassword(
  data: App.Data.Auth.Payload.ResetPasswordPayloadData
): Promise<ApiResult<null>> {
  try {
    const url = createUrl(routes['auth.reset-password']);
    const response = await post<ApiResult<null>>(url, data, AUTH_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function logout(): Promise<ApiResult<null>> {
  try {
    const url = createUrl(routes['auth.logout']);
    const response = await del<ApiResult<null>>(url, AUTH_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function getCurrentUser(): Promise<
  ApiResult<App.Data.User.UserData>
> {
  try {
    const url = createUrl(routes['auth.user']);
    const response = await get<ApiResult<App.Data.User.UserData>>(
      url,
      AUTH_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function verifyMagicLinkToken(
  data: App.Data.Auth.Payload.VerifyMagicLinkTokenPayloadData
): Promise<ApiResult<App.Data.Auth.MagicLinkData>> {
  try {
    const url = createUrl(routes['verification.verify']);
    const response = await post<ApiResult<App.Data.Auth.MagicLinkData>>(
      url,
      data,
      AUTH_TAGS
    );
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}

export async function createEmailAccount(
  data: App.Data.Auth.CreateEmailAccountData
): Promise<ApiResult<null>> {
  try {
    const url = createUrl(routes['auth.register']);
    const response = await post<ApiResult<null>>(url, data, AUTH_TAGS);
    return handleApiResponse(() => Promise.resolve(response));
  } catch (error) {
    return handleApiResponse(() => Promise.reject(error));
  }
}
