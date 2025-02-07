export interface SearchPropertyData {
  id: number;
  location?: string;
  area?: string;
  community?: string;
  // Add other property fields as needed
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
