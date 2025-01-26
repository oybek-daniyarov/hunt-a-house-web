export interface LaravelPaginationProps {
  /**
   * Current page number (1-based)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  lastPage: number;
  /**
   * Total number of items across all pages
   */
  total: number;
  /**
   * Number of pages to show on each side of current page
   * @default 2
   */
  delta?: number;
  /**
   * Class name for the pagination container
   */
  className?: string;
}
