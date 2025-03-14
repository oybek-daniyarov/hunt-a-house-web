import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  headerRight?: ReactNode;
  textAlign?: 'start' | 'center' | 'end';
}

export function Section({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  headerRight,
  textAlign = 'start',
}: SectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description || headerRight) && (
        <div
          className={cn('flex items-center justify-between', headerClassName)}
        >
          <div
            className={cn(
              textAlign === 'start' && 'text-start',
              textAlign === 'center' && 'text-center',
              textAlign === 'end' && 'text-end'
            )}
          >
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
