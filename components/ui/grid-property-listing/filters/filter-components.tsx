'use client';

import React from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePropertyFiltersContext } from './property-filters-context';

// Simple text input with icon
export function TextInputWithIcon({
  value,
  onChange,
  placeholder,
  icon,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        prefix={icon}
      />
    </div>
  );
}

// Simple select with icon
export function SelectWithIcon({
  value,
  onChange,
  placeholder,
  icon,
  options = [],
  className = '',
  valueKey = 'id',
  labelKey = 'name',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  options: any[];
  className?: string;
  valueKey?: string;
  labelKey?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center rounded-md border border-input shadow-sm">
        <span className="px-3 text-muted-foreground flex-shrink-0">{icon}</span>
        <div className="flex-1">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="border-0 shadow-none rounded-s-none">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => {
                const optionValue = String(
                  valueKey === 'value' && 'value' in option
                    ? option.value
                    : option[valueKey]
                );
                const optionLabel = String(
                  labelKey === 'label' && 'label' in option
                    ? option.label
                    : option[labelKey]
                );
                return (
                  <SelectItem key={optionValue} value={optionValue}>
                    {optionLabel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// Filter Badge Component
export function FilterBadge({
  filterKey,
  value,
  onRemove,
}: {
  filterKey: string;
  value: string | number;
  onRemove: () => void;
}) {
  const { getFilterLabel } = usePropertyFiltersContext();

  return (
    <Badge variant="secondary" className="flex items-center gap-1 py-1">
      {getFilterLabel(filterKey, value)}
      <X className="h-3 w-3 cursor-pointer" onClick={onRemove} />
    </Badge>
  );
}

// Filter Counter Badge Component
export function FilterCounterBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <Badge
      variant="secondary"
      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full"
    >
      {count}
    </Badge>
  );
}

// Active Filter Badges Component
export function ActiveFilterBadges() {
  const { filters, hasFilters, handleRemoveFilter, handleClear } =
    usePropertyFiltersContext();

  if (!hasFilters) return null;

  return (
    <div className="flex items-center mt-3">
      <div className="flex flex-wrap gap-2 flex-1">
        {Object.entries(filters).map(([key, value]) => {
          if (!['page', 'sort'].includes(key) && value) {
            return (
              <FilterBadge
                key={key}
                filterKey={key}
                value={value}
                onRemove={() => handleRemoveFilter(key)}
              />
            );
          }
          return null;
        })}
      </div>
      <button
        className="ms-2 whitespace-nowrap text-sm font-medium flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        onClick={handleClear}
      >
        Clear All
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
