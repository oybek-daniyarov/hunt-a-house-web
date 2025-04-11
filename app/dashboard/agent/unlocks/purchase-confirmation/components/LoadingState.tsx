import { Loader2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function LoadingState() {
  return (
    <div className="container max-w-2xl py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            Verifying Payment
          </CardTitle>
          <CardDescription>
            Please wait while we verify your payment...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
