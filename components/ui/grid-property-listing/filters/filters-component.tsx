'use client';

import { ActiveFilterBadges } from './filter-components';
import { FilterPopover } from './filter-popover';
import { SearchInput } from './search-input';
import { SortDropdown } from './sort-dropdown';

export function FiltersComponent() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-3">
        {/* Search field */}
        <div className="flex items-center gap-2">
          <SearchInput />
          <FilterPopover />
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <SortDropdown />
        </div>
      </div>

      {/* Active Filter Badges */}
      <ActiveFilterBadges />
    </div>
  );
}
