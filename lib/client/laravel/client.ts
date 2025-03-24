'use server';

import { revalidateTag } from 'next/cache';

import { getToken } from './cookies';
import type {
  LaravelValidationError,
  NextRequestInit,
  PaginatedResponse,
} from './types';

type Tags = string | string[];

const baseUrl = `${
  process.env.BACKEND_API_URL!.endsWith('/')
    ? process.env.BACKEND_API_URL!.slice(0, -1)
    : process.env.BACKEND_API_URL!
}/`;

const defaultHeaders: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

async function getHeaders(): Promise<HeadersInit> {
  const token = await getToken();
  return {
    ...defaultHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleErrorResponse(response: Response): Promise<never> {
  const error = (await response.json()) as LaravelValidationError;
  throw new Error(error.message || `HTTP error! status: ${response.status}`, {
    cause: error,
  });
}

export async function fetchWithAuth(
  endpoint: string,
  options: NextRequestInit = {}
): Promise<Response> {
  const headers = await getHeaders();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: 'include',
  };

  let response: Response | null = null;

  try {
    response = await fetch(url, fetchOptions);
  } finally {
    if (response && response.status === 401) {
      console.error('Unauthorized');
    }
  }

  if (!response?.ok) {
    await handleErrorResponse(response);
  }

  return response;
}

export async function revalidateTagsAsync(tags?: Tags): Promise<void> {
  if (!tags) return;
  const tagArray = Array.isArray(tags) ? tags : [tags];
  for (const tag of tagArray) {
    revalidateTag(tag);
  }
}

export async function get<T>(path: string, tags?: string[]): Promise<T> {
  const response = await fetch(baseUrl + path, {
    headers: await getHeaders(),
    next: tags ? { tags } : undefined,
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return response.json();
}

export async function post<T>(
  path: string,
  data: any,
  tags?: string[]
): Promise<T> {
  const response = await fetch(baseUrl + path, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data),
    next: tags ? { tags } : undefined,
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return response.json();
}

export async function postFormData<T>(
  path: string,
  formData: FormData,
  tags?: string[]
): Promise<T> {
  const token = await getToken();
  const headers: HeadersInit = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(baseUrl + path, {
    method: 'POST',
    headers,
    body: formData,
    next: tags ? { tags } : undefined,
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return response.json();
}

export async function put<T>(
  path: string,
  data: any,
  tags?: string[]
): Promise<T> {
  const response = await fetch(baseUrl + path, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(data),
    next: tags ? { tags } : undefined,
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return response.json();
}

export async function del<T>(path: string, tags?: string[]): Promise<T> {
  const response = await fetch(baseUrl + path, {
    method: 'DELETE',
    headers: await getHeaders(),
    next: tags ? { tags } : undefined,
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return response.json();
}

export async function list<T>(
  path: string,
  tags?: string[]
): Promise<PaginatedResponse<T>> {
  return get<PaginatedResponse<T>>(path, tags);
}
