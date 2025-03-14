'use client';

import { CreditCard, Info, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PurchaseVerificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  quantity: number;
  price: number;
  currency: string;
  isLoading: boolean;
  onConfirm: () => void;
}

export default function PurchaseVerification({
  open,
  onOpenChange,
  packageName,
  quantity,
  price,
  currency,
  isLoading,
  onConfirm,
}: PurchaseVerificationProps) {
  const totalAmount = quantity * price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Verify Your Purchase
          </DialogTitle>
          <DialogDescription>
            Please review your token purchase details before proceeding to
            payment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm text-muted-foreground">
              Purchase Summary
            </div>

            <div className="flex justify-between items-center mb-2">
              <span>Token Package:</span>
              <span className="font-medium">{packageName}</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span>Number of Tokens:</span>
              <span className="font-medium">{quantity}</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span>Price per Token:</span>
              <span className="font-medium">
                {currency} {price}
              </span>
            </div>

            <div className="border-t my-2"></div>

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-primary">
                {currency} {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">
                  Important Information
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  By proceeding, you agree to purchase {quantity} tokens for a
                  total of {currency} {totalAmount.toLocaleString()}. These
                  tokens will be added to your account immediately after payment
                  and can be used to view property details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="sm:w-auto w-full"
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Proceed to Payment
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
