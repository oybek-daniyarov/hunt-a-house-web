'use client';

import { Search } from 'lucide-react';

import { TextInputWithIcon } from './filter-components';
import { usePropertyFiltersContext } from './property-filters-context';

export function SearchInput() {
  const { locationInput, setLocationInput } = usePropertyFiltersContext();

  return (
    <TextInputWithIcon
      value={locationInput}
      onChange={setLocationInput}
      placeholder="Search location"
      icon={<Search className="h-4 w-4" />}
      className="w-[220px] md:w-[280px]"
    />
  );
}
