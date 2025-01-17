import { revalidateTag } from 'next/cache'
import type { LaravelValidationError, NextRequestInit, PaginatedResponse, ListOptions, Filter, SortOption } from './types'
import { getToken } from './cookies'
type Tags = string | string[]

export class LaravelClient {
  private baseUrl: string
  private encryptionKey: string
  private defaultHeaders: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  constructor(baseUrl: string, encryptionKey: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    this.encryptionKey = encryptionKey
  }

  private async getHeaders(): Promise<HeadersInit> {
    const token = await getToken({
      encryptionKey: this.encryptionKey
    })
    return {
      ...this.defaultHeaders,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  }

  private async fetchWithAuth(
    endpoint: string,
    options: NextRequestInit = {}
  ): Promise<Response> {
    const headers = await this.getHeaders()
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json() as LaravelValidationError
      throw new Error(error.message || `HTTP error! status: ${response.status}`, { 
        cause: error 
      })
    }

    return response
  }

  private revalidateTags(tags?: Tags): void {
    if (!tags) return
    const tagArray = Array.isArray(tags) ? tags : [tags]
    tagArray.forEach(tag => revalidateTag(tag))
  }

  async get<T>(endpoint: string, tags?: Tags): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      next: tags ? { 
        tags: Array.isArray(tags) ? tags : [tags]
      } : undefined
    })
    return response.json()
  }

  async post<T>(endpoint: string, data: unknown, tags?: Tags): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      next: tags ? { 
        tags: Array.isArray(tags) ? tags : [tags]
      } : undefined
    })
    this.revalidateTags(tags)
    return response.json()
  }

  async put<T>(endpoint: string, data: unknown, tags?: Tags): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      next: tags ? { 
        tags: Array.isArray(tags) ? tags : [tags]
      } : undefined
    })
    this.revalidateTags(tags)
    return response.json()
  }

  async patch<T>(endpoint: string, data: unknown, tags?: Tags): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      next: tags ? { 
        tags: Array.isArray(tags) ? tags : [tags]
      } : undefined
    })
    this.revalidateTags(tags)
    return response.json()
  }

  async delete<T>(endpoint: string, tags?: Tags): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'DELETE',
      next: tags ? { 
        tags: Array.isArray(tags) ? tags : [tags]
      } : undefined
    })
    this.revalidateTags(tags)
    return response.json()
  }

  private buildQueryString(options: ListOptions): string {
    const params = new URLSearchParams()

    if (options.page) {
      params.append('page', options.page.toString())
    }
    
    if (options.perPage) {
      params.append('per_page', options.perPage.toString())
    }

    if (options.filters?.length) {
      options.filters.forEach(filter => {
        if (Array.isArray(filter.value)) {
          filter.value.forEach(val => {
            params.append(filter.field + '[]', val.toString())
          })
        } else {
          params.append(filter.field, filter.value?.toString() ?? '')
        }
      })
    }

    if (options.sort?.length) {
      const [sort] = options.sort
      params.append('sort', sort.field)
      params.append('direction', sort.direction)
    }

    return params.toString()
  }

  async list<T>(
    endpoint: string,
    options: ListOptions = {},
    tags?: Tags
  ): Promise<PaginatedResponse<T>> {
    const queryString = this.buildQueryString(options)
    const url = queryString ? `${endpoint}?${queryString}` : endpoint


    console.log(url)

    const response = await this.fetchWithAuth(url, {
      next: tags ? { 
        tags: Array.isArray(tags) ? tags : [tags]
      } : undefined
    })
    return response.json()
  }
} 




const client = new LaravelClient(process.env.BACKEND_API_URL!, process.env.ENCRYPTION_KEY!)

export default client