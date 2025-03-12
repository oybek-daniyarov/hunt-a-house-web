import { IoCardOutline, IoCash, IoLockClosed } from 'react-icons/io5';

import { PropertyInfo } from '@/components/listing/contact/components/property-info';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CreditViewProps {
  listing: App.Data.Lead.LeadListData;
  credits?: number;
}

export function CreditView({ listing, credits = 0 }: CreditViewProps) {
  const hasCredits = credits >= 1;

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted/50">
        <div className="space-y-4 p-4">
          <PropertyInfo listing={listing} />

          {listing.description && (
            <p className="text-sm text-muted-foreground border-t pt-4">
              {listing.description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
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

        <div className="space-y-3">
          {hasCredits ? (
            <Button
              size="lg"
              className="relative w-full h-12 bg-primary hover:bg-primary/90 transition-colors"
            >
              <IoLockClosed className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">
                Unlock Contact Details
              </span>
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
              >
                <IoCardOutline className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Purchase Credits</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Contact details will be instantly revealed after using{' '}
        {listing.creditCost} token{listing.creditCost !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
