'use client';

import { useState } from 'react';
import { Loader2, SearchX } from 'lucide-react';

import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { searchLocations } from '@/lib/data/laravel/location/location.api';

export type LocationSearchProps = {
  value?: Option[];
  onChange?: (value: Option[]) => void;
  placeholder?: string;
  maxSelected?: number;
  disabled?: boolean;
};

export const LocationSearch = ({
  value,
  onChange,
  placeholder = 'Enter a community, area or Emirate',
  maxSelected = 3,
  disabled = false,
}: LocationSearchProps) => {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <MultipleSelector
      value={value}
      onChange={onChange}
      maxSelected={maxSelected}
      groupBy="group"
      placeholder={placeholder}
      disabled={disabled}
      onSearch={async (query) => {
        const locations = await searchLocations(query);
        setHasSearched(true);
        return (
          locations.data?.map((location) => ({
            label: location.name,
            value: location.id.toString(),
            group: location.parent?.name,
          })) ?? []
        );
      }}
      loadingIndicator={
        <div className="flex items-center justify-center gap-2 py-1 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching for locations...
        </div>
      }
      emptyIndicator={
        <div className="flex items-center justify-center gap-2 py-1 text-sm text-muted-foreground">
          <SearchX className="h-4 w-4" />
          {hasSearched
            ? 'No matching locations found'
            : 'Type to search for a location, e.g. Dubai'}
        </div>
      }
    />
  );
};
