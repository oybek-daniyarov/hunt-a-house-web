'use client';

import { useState } from 'react';
import { Check, Coins, Info, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { purchaseProductAction } from '@/lib/data/laravel/product/product.actions';
import { cn } from '@/lib/utils';
import PurchaseVerification from './purchase-verification';

// Credit pricing
const CREDIT_PRICE = 2; // AED per credit
const CURRENCY = 'AED';

// Preset view packages
const VIEW_PACKAGES = [
  { amount: 10, label: 'Basic', description: 'Unlock up to 10 properties' },
  {
    amount: 25,
    label: 'Standard',
    description: 'Unlock up to 25 properties',
    popular: true,
  },
  { amount: 50, label: 'Premium', description: 'Unlock up to 50 properties' },
];

export default function ProductsList() {
  const [selectedPackage, setSelectedPackage] = useState(1); // Index of the selected package
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  // Get the quantity based on selection
  const quantity = isCustom
    ? parseInt(customAmount) || 0
    : VIEW_PACKAGES[selectedPackage]?.amount || 10;

  const handlePurchase = async () => {
    if (quantity <= 0) {
      toast.error('Please select a valid number of unlocks');
      return;
    }

    setIsLoading(true);

    try {
      const result = await purchaseProductAction({ quantity });

      if (result.success && result.data?.checkoutUrl) {
        // Use window.location.href for client-side navigation to external URL
        window.location.href = result.data.checkoutUrl;
      } else if (!result.success) {
        toast.error(result.error?.message || 'Failed to initiate purchase');
      } else {
        toast.error('No checkout URL returned');
      }
    } catch (error) {
      // Check if it's a redirect error (this shouldn't happen with our updated approach)
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        console.log('Redirect handled by Next.js');
        return;
      }

      console.error(error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
      setShowVerification(false);
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const openVerification = () => {
    if (quantity <= 0) {
      toast.error('Please select a valid number of unlocks');
      return;
    }
    setShowVerification(true);
  };

  // Get the package name based on selection
  const packageName = isCustom
    ? 'Custom Amount'
    : VIEW_PACKAGES[selectedPackage]?.label || 'Basic';

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Purchase Unlocks</CardTitle>
              <CardDescription className="mt-2">
                Unlocks allow you to view property details and contact
                information
              </CardDescription>
            </div>
            <Coins className="h-10 w-10 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Package selection */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {VIEW_PACKAGES.map((pkg, index) => (
              <div
                key={index}
                className={cn(
                  'relative cursor-pointer rounded-lg border p-4 transition-all hover:ring-2 hover:ring-primary/50',
                  selectedPackage === index && !isCustom
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'border-border',
                  pkg.popular && 'border-primary/40'
                )}
                onClick={() => {
                  setSelectedPackage(index);
                  setIsCustom(false);
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 -right-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    Popular
                  </div>
                )}
                <div className="mb-2 font-medium">{pkg.label}</div>
                <div className="text-2xl font-bold">
                  {pkg.amount}{' '}
                  <span className="text-sm font-normal">unlocks</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {pkg.description}
                </div>
                <div className="mt-2 font-medium text-primary">
                  {CURRENCY} {(pkg.amount * CREDIT_PRICE).toLocaleString()}
                </div>
                {selectedPackage === index && !isCustom && (
                  <div className="absolute bottom-2 right-2 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom amount */}
          <div
            className={cn(
              'cursor-pointer rounded-lg border p-4 transition-all hover:ring-2 hover:ring-primary/50',
              isCustom ? 'ring-2 ring-primary bg-primary/5' : 'border-border'
            )}
            onClick={() => setIsCustom(true)}
          >
            <div className="mb-2 font-medium">Custom Amount</div>
            <div className="flex items-center gap-3">
              <Input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                onClick={(e) => e.stopPropagation()}
                placeholder="Enter amount"
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">unlocks</span>
            </div>
            {isCustom && customAmount && (
              <div className="mt-2 font-medium text-primary">
                {CURRENCY}{' '}
                {(parseInt(customAmount) * CREDIT_PRICE || 0).toLocaleString()}
              </div>
            )}
            {isCustom && (
              <div className="absolute bottom-2 right-2 text-primary">
                <Check className="h-5 w-5" />
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">Total</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Each unlock allows you to view one property</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-xl font-bold">
                {CURRENCY} {(quantity * CREDIT_PRICE).toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={openVerification}
            disabled={isLoading || quantity <= 0}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Review Purchase
            </span>
          </Button>
        </CardFooter>
      </Card>

      {/* Purchase Verification Dialog */}
      <PurchaseVerification
        open={showVerification}
        onOpenChange={setShowVerification}
        packageName={packageName}
        quantity={quantity}
        price={CREDIT_PRICE}
        currency={CURRENCY}
        isLoading={isLoading}
        onConfirm={handlePurchase}
      />
    </>
  );
}
