import { stegaClean } from 'next-sanity';

import { Button } from '@/components/ui/button';
import SanityLink from '@/components/ui/sanity-link';

interface SanityButtonLinkProps {
  link: Sanity.Link;
  className?: string;
}

export default function SanityButtonLink({
  link,
  className,
}: SanityButtonLinkProps) {
  if (!link) return null;

  return (
    <Button
      variant={stegaClean(link.buttonVariant)}
      asChild
      className={className}
    >
      <SanityLink link={link} />
    </Button>
  );
}
