'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Location } from './location-search-field';

interface LocationDropdownProps {
  id: string;
  isOpen: boolean;
  locations: Location[];
  selectedValue?: string;
  searchTerm: string;
  minSearchLength: number;
  emptyMessage: string;
  onSelect: (location: Location) => void;
}

export function LocationDropdown({
  id,
  isOpen,
  locations,
  selectedValue,
  searchTerm,
  minSearchLength,
  emptyMessage,
  onSelect,
}: LocationDropdownProps) {
  if (!isOpen) return null;

  const getHelperText = () => {
    if (searchTerm) {
      if (searchTerm.length < minSearchLength) {
        return `Type at least ${minSearchLength} characters to search`;
      }
      return 'Searching locations...';
    }
    return selectedValue
      ? 'Type to search for more locations'
      : 'Start typing to search locations';
  };

  return (
    <div
      id={id}
      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-md"
      role="listbox"
    >
      <div className="p-1">
        {/* Helper text - always shown */}
        <div className="px-2 py-1.5 text-xs text-muted-foreground border-b mb-1">
          {getHelperText()}
        </div>

        {locations.length === 0 ? (
          <div className="px-2 py-3 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          locations.map((location) => (
            <button
              key={location.value}
              onClick={() => onSelect(location)}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                selectedValue === location.value &&
                  'bg-accent text-accent-foreground'
              )}
              role="option"
              aria-selected={selectedValue === location.value}
            >
              <Check
                className={cn(
                  'h-4 w-4',
                  selectedValue === location.value ? 'opacity-100' : 'opacity-0'
                )}
              />
              {location.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
