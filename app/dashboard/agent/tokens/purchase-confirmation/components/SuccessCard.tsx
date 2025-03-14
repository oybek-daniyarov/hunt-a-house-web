import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PaymentDetails } from './PaymentDetails';
import { SuccessMessage } from './SuccessMessage';

interface SuccessCardProps {
  paymentData: App.Data.Product.Dto.PaymentSuccessData;
}

export function SuccessCard({ paymentData }: SuccessCardProps) {
  return (
    <div className="container max-w-2xl py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            Payment Successful
          </CardTitle>
          <CardDescription>
            Your tokens have been added to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-6">
            <PaymentDetails
              paymentId={paymentData.paymentId}
              formattedDate={paymentData.formattedDate}
              formattedAmount={paymentData.formattedAmount}
              currency={paymentData.currency}
              credits={paymentData.credits}
            />

            <SuccessMessage credits={paymentData.credits} />

            {paymentData.receiptUrl && (
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <a
                    href={paymentData.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Receipt
                  </a>
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" asChild>
            <Link
              href="/dashboard/agent/tokens"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
