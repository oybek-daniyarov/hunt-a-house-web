'use client';

import * as React from 'react';
import { Loader2, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
  showClearButton?: boolean;
  className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      isLoading,
      showClearButton,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        <Input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn('pr-10', className)}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : showClearButton ? (
            <button
              type="button"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
