import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center rounded-md border border-input w-full shadow-sm',
          className
        )}
      >
        {prefix && (
          <span className="px-3 text-muted-foreground flex-shrink-0">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex h-8 w-full rounded-md rounded-s-none border-0 bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            !prefix && 'rounded-s-md'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
