import client from '@/lib/client/laravel/client.browser';
import { ApiResult, handleApiResponse } from '@/lib/client/laravel/helpers/api';

const AUTH_TAGS = ['auth', 'user'] as string[];

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
