'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function PropertyPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="mt-6 sm:mt-8 md:mt-12 flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="sm:text-base sm:h-10"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="sm:text-base sm:h-10"
        disabled
      >
        Page {currentPage}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="sm:text-base sm:h-10"
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
}
