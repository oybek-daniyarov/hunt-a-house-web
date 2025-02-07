'use client';

import * as React from 'react';
import { Control, useWatch } from 'react-hook-form';

import { FormFieldWrapper } from '@/components/ui/form-field-wrapper';
import { useDebounce } from '@/components/ui/multiple-selector';
import { LocationDropdown } from './location-dropdown';
import { SearchInput } from './search-input';

export interface Location {
  value: string;
  label: string;
}

interface LocationSearchFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  /** Function to search locations via API */
  onSearch: (query: string) => Promise<Location[]>;
  /** Optional default locations to show before search */
  defaultLocations?: Location[];
  /** Minimum characters required to trigger search */
  minSearchLength?: number;
  /** Debounce delay for search in ms */
  searchDelay?: number;
  /** Custom empty state message */
  emptyMessage?: string;
  className?: string;
}

export function LocationSearchField({
  name,
  control,
  label,
  placeholder = 'Search location...',
  onSearch,
  defaultLocations = [],
  minSearchLength = 2,
  searchDelay = 500,
  emptyMessage = 'No location found.',
  className,
}: LocationSearchFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [locations, setLocations] =
    React.useState<Location[]>(defaultLocations);
  const [selectedLocation, setSelectedLocation] =
    React.useState<Location | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldValue = useWatch({ control, name });

  const debouncedSearchTerm = useDebounce(searchTerm, searchDelay);

  const handleSearch = React.useCallback(
    async (query: string) => {
      if (!query || query.length < minSearchLength) {
        setLocations(defaultLocations);
        return;
      }

      setIsLoading(true);
      try {
        const results = await onSearch(query);
        setLocations(results);
      } catch (error) {
        console.error('Failed to search locations:', error);
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    },
    [defaultLocations, minSearchLength, onSearch]
  );

  // Initialize selectedLocation from defaultLocations if field has value
  React.useEffect(() => {
    if (fieldValue && !selectedLocation) {
      const location = defaultLocations.find(
        (loc) => loc.value.toLowerCase() === fieldValue.toLowerCase()
      );
      if (location) {
        setSelectedLocation(location);
      } else {
        // If no exact match found, create a location object from the field value
        setSelectedLocation({
          value: fieldValue,
          label: fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1),
        });
      }
    }
  }, [fieldValue, defaultLocations]);

  React.useEffect(() => {
    void handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setIsOpen(true);
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    },
    []
  );

  return (
    <FormFieldWrapper control={control} name={name} label={label}>
      {(field) => (
        <div ref={containerRef} className="relative">
          <SearchInput
            ref={inputRef}
            placeholder={placeholder}
            value={searchTerm || (field.value && selectedLocation?.label) || ''}
            onChange={(value) => {
              setSearchTerm(value);
              if (selectedLocation) {
                setSelectedLocation(null);
                field.onChange('');
              }
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsOpen(true);
              if (selectedLocation) {
                setSearchTerm('');
              }
            }}
            onClear={() => {
              setSearchTerm('');
              setSelectedLocation(null);
              field.onChange('');
              setLocations(defaultLocations);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            className={className}
            isLoading={isLoading}
            showClearButton={!!field.value && !searchTerm}
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls={`${name}-locations`}
            role="combobox"
          />

          <LocationDropdown
            id={`${name}-locations`}
            isOpen={isOpen}
            locations={locations}
            selectedValue={field.value}
            searchTerm={searchTerm}
            minSearchLength={minSearchLength}
            emptyMessage={emptyMessage}
            onSelect={(location) => {
              setSelectedLocation(location);
              field.onChange(location.value);
              setSearchTerm('');
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </FormFieldWrapper>
  );
}
