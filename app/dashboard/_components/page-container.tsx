import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function PageContainer({
  children,
  className,
  centered = true,
}: PageContainerProps) {
  return (
    <section className="my-8 px-4">
      <div className={cn('space-y-8', centered && 'mx-auto', className)}>
        {children}
      </div>
    </section>
  );
}
