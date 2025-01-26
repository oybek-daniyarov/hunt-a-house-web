import client from '@/lib/client/laravel/client';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';

const AUTH_TAGS = ['auth', 'user'] as string[];

export async function register(
  data: App.Data.Auth.RegisterData
): Promise<ApiResult<App.Data.Auth.RegisterData>> {
  return handleApiResponse(() =>
    client.post<App.Data.Auth.RegisterData>(
      '/auth/register',
      {
        ...data,
      },
      AUTH_TAGS
    )
  );
}

export async function login(
  data: App.Data.Auth.Payload.LoginPayloadData
): Promise<ApiResult<App.Data.Auth.LoginData>> {
  return handleApiResponse(() =>
    client.post<App.Data.Auth.LoginData>(
      '/auth/login',
      {
        ...data,
      },
      AUTH_TAGS
    )
  );
}

export async function forgotPassword(
  data: App.Data.Auth.Payload.ForgotPasswordPayloadData
): Promise<ApiResult<void>> {
  return handleApiResponse(() =>
    client.post<void>(
      '/auth/forgot-password',
      {
        ...data,
      },
      AUTH_TAGS
    )
  );
}

export async function resetPassword(
  data: App.Data.Auth.Payload.ResetPasswordPayloadData
): Promise<ApiResult<App.Data.Auth.ResetPasswordData>> {
  return handleApiResponse(() =>
    client.post<App.Data.Auth.ResetPasswordData>(
      '/auth/reset-password',
      {
        ...data,
      },
      AUTH_TAGS
    )
  );
}

export async function logout(): Promise<ApiResult<void>> {
  return handleApiResponse(() =>
    client.post<void>('/auth/logout', {}, AUTH_TAGS)
  );
}

export async function getCurrentUser(): Promise<
  ApiResult<App.Data.User.UserData>
> {
  return handleApiResponse(() =>
    client.get<App.Data.User.UserData>('/auth/user', AUTH_TAGS)
  );
}
