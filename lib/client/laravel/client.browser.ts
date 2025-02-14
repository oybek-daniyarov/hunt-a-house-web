type RequestOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  tags?: string[];
};

async function handleResponse<T>(response: Response): Promise<T> {
  const error = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error(error.message || 'An error occurred');
  }
  return error;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  const response = await fetch(`/api${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
  });

  return handleResponse<T>(response);
}

const client = {
  get: <T>(endpoint: string, tags?: string[]) =>
    request<T>(endpoint, { method: 'GET', tags }),

  post: <T>(endpoint: string, data?: any, tags?: string[]) =>
    request<T>(endpoint, { method: 'POST', body: data, tags }),

  put: <T>(endpoint: string, data?: any, tags?: string[]) =>
    request<T>(endpoint, { method: 'PUT', body: data, tags }),

  delete: <T>(endpoint: string, tags?: string[]) =>
    request<T>(endpoint, { method: 'DELETE', tags }),
};

export default client;
