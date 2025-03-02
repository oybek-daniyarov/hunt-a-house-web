'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ContactView } from '@/components/listing/contact/contact-view';
import { CreditView } from '@/components/listing/contact/credit-view';
import { GuestView } from '@/components/listing/contact/guest-view';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  listings: App.Data.Lead.LeadListData[];
}

// Define a type for the view types
type ViewType = 'guest' | 'purchased' | 'authenticated';

const titleMap: Record<ViewType, string> = {
  guest: 'Unlock Property Details',
  purchased: 'Contact Information',
  authenticated: 'View Contact Details',
};

const viewMap = {
  guest: GuestView,
  purchased: ContactView,
  authenticated: CreditView,
};

export default function ContactModal({ listings }: ContactModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.has('lead-id');

  const leadId = searchParams.get('lead-id');
  const activeListing = listings.find(
    (listing) => listing.id.toString() === leadId
  );

  const onOpenChange = (open: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!open) {
      params.delete('lead-id');
      router.replace(`?${params.toString()}`);
    }
  };

  if (!activeListing) return null;

  // Determine user state
  const isAgent = activeListing.user?.userType === 'agent';
  const credits = activeListing.user?.credits || 0;
  const isPurchased = activeListing.isUserHadPurchasedLead && isAgent;

  // User state logic:
  // 1. If user has purchased the lead, show contact details
  // 2. If user is an agent (with or without credits), show credit view
  // 3. Otherwise, user is a guest, show guest view

  let viewType: ViewType = 'guest';

  if (isPurchased) {
    viewType = 'purchased';
  } else if (isAgent) {
    viewType = 'authenticated';
  }

  const title = titleMap[viewType];
  const View = viewMap[viewType];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'p-0 gap-0 max-h-[95vh] overflow-hidden mx-4 border-none bg-background/80 backdrop-blur-xl',
          isPurchased
            ? 'sm:max-w-[800px] sm:mx-auto'
            : 'sm:max-w-[425px] sm:mx-auto'
        )}
      >
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(95vh-2rem)]">
          <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
          <View listing={activeListing} credits={credits} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
