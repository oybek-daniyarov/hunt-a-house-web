import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { getVisiblePages } from "./utils"
import { PaginationLink } from "./pagination-link"
import type { LaravelPaginationProps } from "./types"

/**
 * A pagination component that follows Laravel's pagination structure
 * and integrates with Next.js client-side navigation.
 */
export default function LaravelPagination({
  currentPage,
  lastPage,
  total,
  delta = 2,
  className,
}: LaravelPaginationProps) {
  // Don't render pagination if there's only one page
  if (lastPage <= 1) return null

  const visiblePages = getVisiblePages(currentPage, lastPage, delta)

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous Page Button */}
        <PaginationItem>
          <PaginationLink 
            page={currentPage - 1}
            isDisabled={currentPage === 1}
            ariaLabel="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </PaginationLink>
        </PaginationItem>

        {/* Page Numbers */}
        {visiblePages.map((page: number | string, index: number) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink 
                page={page}
                isActive={currentPage === page}
                isDisabled={currentPage === page}
                ariaLabel={`Go to page ${page}`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Page Button */}
        <PaginationItem>
          <PaginationLink 
            page={currentPage + 1}
            isDisabled={currentPage === lastPage}
            ariaLabel="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
} 