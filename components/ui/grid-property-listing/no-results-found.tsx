'use client';

import { HomeIcon } from 'lucide-react';

import { Button } from '../button';
import { usePropertyFilters } from './use-property-filters';

export default function NoResultsFound() {
  const [_, setFilters] = usePropertyFilters();

  const handleClearFilters = async () => {
    await setFilters(null);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <HomeIcon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No property leads found</h3>
      <p className="text-gray-500 max-w-md mb-6">
        We couldn&apos;t find any property leads matching your search criteria.
        Try adjusting your filters or search terms.
      </p>
      <Button onClick={handleClearFilters} className="px-6 py-2">
        Clear all filters
      </Button>
    </div>
  );
}
