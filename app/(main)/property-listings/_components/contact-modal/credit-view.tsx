import { Coins, CreditCard, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PropertyInfo } from './components/property-info';

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
              <Coins
                className={cn(
                  'h-5 w-5',
                  hasCredits ? 'text-primary' : 'text-destructive'
                )}
              />
            </div>
            <div>
              <p className="font-medium">Your Credits</p>
              <p className="text-sm text-muted-foreground">
                {credits} credit{credits !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">Cost</p>
            <p className="text-sm text-muted-foreground">1 credit</p>
          </div>
        </div>

        <div className="space-y-3">
          {hasCredits ? (
            <Button
              size="lg"
              className="relative w-full h-12 bg-primary hover:bg-primary/90 transition-colors"
            >
              <Lock className="mr-2 h-4 w-4" />
              Unlock Contact Details
            </Button>
          ) : (
            <>
              <div className="flex items-center justify-center w-full h-12 rounded-md bg-[#ff444422] text-[#ff6b6b] dark:bg-[#ff444410] dark:text-[#ff8f8f]">
                Insufficient Credits
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 hover:bg-muted/5 transition-colors"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Purchase Credits
              </Button>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Contact details will be instantly revealed after using 1 credit
      </p>
    </div>
  );
}
