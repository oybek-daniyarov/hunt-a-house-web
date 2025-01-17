import type { ReadonlyURLSearchParams } from "next/navigation"

/**
 * Create a URL with updated page parameter
 */
export function createPageURL(
  searchParams: ReadonlyURLSearchParams,
  pageNumber: number | string
): string {
  const params = new URLSearchParams(searchParams)
  params.set("page", pageNumber.toString())
  return `?${params.toString()}`
}

/**
 * Calculate the visible page numbers for pagination
 * @param currentPage Current page number (1-based)
 * @param lastPage Total number of pages
 * @param delta Number of pages to show on each side of current page
 * @returns Array of page numbers and ellipsis
 */
export function getVisiblePages(
  currentPage: number,
  lastPage: number,
  delta: number
): (number | string)[] {
  const range: number[] = []
  const rangeWithDots: (number | string)[] = []
  let lastNumber: number | undefined

  // Calculate the range of pages to show
  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    }
  }

  // Add dots where needed
  for (const i of range) {
    if (lastNumber) {
      if (i - lastNumber === 2) {
        rangeWithDots.push(lastNumber + 1)
      } else if (i - lastNumber !== 1) {
        rangeWithDots.push("...")
      }
    }
    rangeWithDots.push(i)
    lastNumber = i
  }

  return rangeWithDots
} 