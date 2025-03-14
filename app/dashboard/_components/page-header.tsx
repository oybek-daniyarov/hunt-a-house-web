import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  textAlign?: 'start' | 'center' | 'end';
}

export function PageHeader({
  title,
  description,
  children,
  className,
  textAlign = 'start',
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            textAlign === 'start' && 'text-start',
            textAlign === 'center' && 'text-center',
            textAlign === 'end' && 'text-end'
          )}
        >
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  );
}
