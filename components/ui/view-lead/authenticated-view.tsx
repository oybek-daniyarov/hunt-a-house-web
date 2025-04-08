import { useTransition } from 'react';
import Link from 'next/link';
import {
  IoCardOutline,
  IoCash,
  IoCheckmarkCircle,
  IoLockClosed,
} from 'react-icons/io5';
import { toast } from 'sonner';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { purchaseLeadAction } from '@/lib/data/laravel/lead/lead.actions';
import { cn } from '@/lib/utils';

interface CreditViewProps {
  listing: App.Data.Lead.LeadListData;
}

export function AuthenticatedView({ listing }: CreditViewProps) {
  const [isPending, startTransition] = useTransition();
  const isPurchased = listing.isUserHadPurchasedLead;

  const { user } = useAuth();

  const hasCredits = user?.credits && user.credits >= listing.creditCost;
  const credits = user?.credits || 0;

  const handlePurchaseLead = () => {
    if (!user || !listing.id || isPurchased) return;

    // Use startTransition to indicate that we're starting an async operation
    startTransition(async () => {
      try {
        const response = await purchaseLeadAction(listing.id);

        if (response.success) {
          toast.success('Contact details unlocked successfully.');
        } else {
          toast.error(
            response.error?.toString() ||
              'Failed to unlock contact details. Please try again.'
          );
        }
      } catch (error) {
        toast.error('Failed to unlock contact details. Please try again.');
        console.error('Failed to purchase lead:', error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {isPurchased ? (
          <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-primary/10 text-primary">
            <IoCheckmarkCircle className="h-5 w-5" />
            <p className="font-medium">
              You&apos;ve already purchased this lead
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-lg bg-gradient-to-br from-background to-muted/50 p-4">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'rounded-full p-2.5',
                  hasCredits ? 'bg-primary/5' : 'bg-destructive/5'
                )}
              >
                <IoCash
                  className={cn(
                    'h-5 w-5',
                    hasCredits ? 'text-primary' : 'text-destructive'
                  )}
                />
              </div>
              <div>
                <p className="text-sm font-medium">Your Tokens</p>
                <p className="text-sm text-muted-foreground">
                  {credits} token{credits !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Cost</p>
              <p className="text-sm text-muted-foreground">
                {listing?.creditCost}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {hasCredits ? (
            <Button
              size="lg"
              className="relative w-full h-12 bg-primary hover:bg-primary/90 transition-colors"
              onClick={handlePurchaseLead}
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ms-1 me-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <IoLockClosed className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">
                    Unlock Contact Details
                  </span>
                </>
              )}
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-center w-full h-12 rounded-md bg-[#ff444422] text-[#ff6b6b] dark:bg-[#ff444410] dark:text-[#ff8f8f]">
                <span className="text-sm font-medium">
                  Insufficient Credits
                </span>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 hover:bg-muted/5 transition-colors"
                asChild
              >
                <Link href="/dashboard/agent/tokens">
                  <IoCardOutline className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">Purchase Credits</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {!isPurchased && (
        <p className="text-center text-xs text-muted-foreground">
          Contact details will be instantly revealed after using{' '}
          {listing.creditCost} token{listing.creditCost !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
