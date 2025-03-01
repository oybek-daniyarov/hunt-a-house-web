import Link from 'next/link';
import { Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContactButtonProps {
  className?: string;
  listing: App.Data.Lead.LeadListData;
}

export function ContactButton({ className, listing }: ContactButtonProps) {
  // Create a new URLSearchParams to avoid mutating the original
  const params = new URLSearchParams();

  // Add the contact param
  params.set('lead-id', listing.id.toString());

  return (
    <Button
      asChild
      variant="default"
      size="lg"
      className={cn('gap-2', className)}
    >
      <Link href={`?${params.toString()}`} scroll={false} prefetch>
        <Phone className="h-4 w-4" />
        View Contact Details
      </Link>
    </Button>
  );
}
