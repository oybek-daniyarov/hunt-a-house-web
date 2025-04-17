import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';

import LaravelLive from '@/components/LaravelLive';
import WithProviders from '@/components/providers/with-providers';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: '%s | Schema UI Starter',
    default: 'Sanity Next.js Website | Schema UI Starter',
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: !isProduction ? 'noindex, nofollow' : 'index, follow',
};

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <link rel="icon" href="/favicon.ico" />
      <body
        className={cn(
          'min-h-screen h-px flex flex-col bg-background font-sans antialiased overscroll-none',
          fontSans.variable
        )}
      >
        <WithProviders>
          <LaravelLive />
          {children}
        </WithProviders>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
