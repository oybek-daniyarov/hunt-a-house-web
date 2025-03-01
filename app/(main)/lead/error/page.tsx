import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Lead Activation Error',
};

export default async function LeadErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;
  const errorMessage = message || 'An error occurred during lead activation.';

  return (
    <div className="relative z-20 min-h-[80vh] flex items-center justify-center">
      <div className="relative px-8 md:px-0 py-[4rem] sm:py-[5rem] md:py-[6.25rem] mx-auto sm:max-w-[37.5rem] md:max-w-[40.625rem] lg:max-w-[53.125rem] xl:max-w-[70rem] text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="font-bold text-3xl md:text-4xl mb-6">
          Lead Activation Error
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">{errorMessage}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
