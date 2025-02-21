import { ComponentProps } from 'react';
import Link from 'next/link';

import resolveUrl, { PageType } from '@/sanity/lib/resolve-url';

interface SanityLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  link: Sanity.Link;
}

export default function SanityLink({
  link,
  className,
  children,
  ...rest
}: SanityLinkProps) {
  if (!link) return null;

  const { type, internal, external, params, newTab } = link;
  const isExternal = type === 'external';
  const href = isExternal
    ? external || '#'
    : resolveUrl(internal?._type as PageType, internal?.slug || '', {
        base: false,
        params,
      });
  const target = newTab ? '_blank' : undefined;
  const rel = newTab || isExternal ? 'noopener noreferrer' : undefined;
  const sharedProps = {
    href,
    target,
    rel,
    className,
    ...rest,
  };

  if (isExternal) {
    return <a {...sharedProps}>{children || link.label || link.external}</a>;
  }

  return (
    <Link {...sharedProps}>
      {children || link.label || link.internal?.title}
    </Link>
  );
}
