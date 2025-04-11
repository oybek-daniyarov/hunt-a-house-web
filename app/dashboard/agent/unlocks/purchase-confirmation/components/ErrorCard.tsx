import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ErrorCardProps {
  title?: string;
  description?: string;
  errorMessage?: string;
}

export function ErrorCard({
  title = 'Payment Verification Failed',
  description = 'There was an issue with your payment',
  errorMessage = 'There was an issue verifying your payment. Please contact support for assistance.',
}: ErrorCardProps) {
  return (
    <div className="container max-w-2xl py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">
                    Payment Verification Failed
                  </p>
                  <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" asChild>
            <Link
              href="/dashboard/agent/unlocks"
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
