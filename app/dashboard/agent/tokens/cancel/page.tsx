import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cancelPurchaseAction } from '@/lib/data/laravel/product/product.actions';

export const metadata: Metadata = {
  title: 'Payment Cancelled | HuntAHouse',
  description: 'Your payment has been cancelled',
};

export default async function CancelPaymentPage() {
  // Call the cancel API to clean up any pending transactions
  const result = await cancelPurchaseAction();

  return (
    <div className="mx-auto max-w-md">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment has been cancelled. No charges have been made.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If you encountered any issues during the payment process, please
            contact our support team.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/dashboard/agent/tokens">Return to Tokens</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
