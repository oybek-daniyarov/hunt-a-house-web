
import client from "@/lib/client/laravel/client"
import { ApiResult } from "@/lib/client/laravel/helpers/api"
import { handleApiResponse } from "@/lib/client/laravel/helpers/api"

const AUTH_TAGS = ['auth', 'user'] as string[]


export async function register(
    data: App.Data.Auth.Requests.RegisterRequest
  ): Promise<ApiResult<App.Data.Auth.RegisterResponse>> {
    return handleApiResponse(() =>
      client.post<App.Data.Auth.RegisterResponse>('/auth/register', {
        ...data,
      }, AUTH_TAGS)
    )
  }


export async function login(
    data: App.Data.Auth.Requests.LoginRequest
  ): Promise<ApiResult<App.Data.Auth.LoginResponse>> {
    return handleApiResponse(() =>
      client.post<App.Data.Auth.LoginResponse>('/auth/login', {
        ...data,
      }, AUTH_TAGS)
    )
  }



export async function forgotPassword(
    data: App.Data.Auth.ForgotPasswordData
  ): Promise<ApiResult<void>> {
    return handleApiResponse(() =>
      client.post<void>('/auth/forgot-password', {
        ...data,
      }, AUTH_TAGS)
    )
  } 


export async function resetPassword(
    data: App.Data.Auth.Requests.ResetPasswordRequest
  ): Promise<ApiResult<App.Data.Auth.ResetPasswordResponse>> {
    return handleApiResponse(() =>
      client.post<App.Data.Auth.ResetPasswordResponse>('/auth/reset-password', {
        ...data,
      }, AUTH_TAGS)
    )
  }

export async function logout(): Promise<ApiResult<void>> {
    return handleApiResponse(() =>
      client.post<void>('/auth/logout', {}, AUTH_TAGS)
    )
  }


  export async function getCurrentUser(): Promise<ApiResult<App.Data.User.UserData>> {
    return handleApiResponse(() =>
      client.get<App.Data.User.UserData>('/auth/user', AUTH_TAGS)
    )
  }