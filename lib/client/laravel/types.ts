export type LaravelValidationError = {
  message: string
  errors?: {
    [field: string]: string[]
  }
}

export type ResponseError = {
    message: string
    status?: number
    errors?: Record<string, string[]>
  }

export type NextRequestInit = RequestInit & {
  next?: {
    tags?: string[]
    revalidate?: number
  }
}

export type ActionResponse<T> = {
    data?: T
    error?: ResponseError
    success: boolean
    redirect?: string
  }

export type PaginationLink = {
  url: string | null
  label: string
  active: boolean
}

export type PaginatedResponse<T> = {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type SortDirection = 'asc' | 'desc'

export type SortOption = {
  field: string
  direction: SortDirection
}

export type FilterOperator = 
  | 'eq' 
  | 'neq' 
  | 'gt' 
  | 'gte' 
  | 'lt' 
  | 'lte' 
  | 'like' 
  | 'in' 
  | 'not_in' 
  | 'between'

export type FilterValue = string | number | boolean | null | Array<string | number>

export type Filter = {
  field: string
  operator: FilterOperator
  value: FilterValue
}

export type ListOptions = {
  page?: number
  perPage?: number
  filters?: Filter[]
  sort?: SortOption[]
}