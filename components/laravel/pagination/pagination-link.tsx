'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { createPageURL } from './utils';

interface PaginationLinkProps {
  /**
   * Page number to link to
   */
  page: number | string;
  /**
   * Whether this is the current active page
   */
  isActive?: boolean;
  /**
   * Whether the link should be disabled
   */
  isDisabled?: boolean;
  /**
   * Accessible label for the link
   */
  ariaLabel?: string;
  /**
   * Children to render inside the link
   */
  children: React.ReactNode;
}

/**
 * A client component that handles pagination link interactions
 */
export function PaginationLink({
  page,
  isActive,
  isDisabled,
  ariaLabel,
  children,
}: PaginationLinkProps) {
  const searchParams = useSearchParams();

  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="icon"
      asChild={!isDisabled}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      {!isDisabled ? (
        <Link href={createPageURL(searchParams, page)} prefetch scroll={false}>
          {children}
        </Link>
      ) : (
        <div>{children}</div>
      )}
    </Button>
  );
}
