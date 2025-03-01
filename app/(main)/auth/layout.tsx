import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 md:p-6">
      <div className="w-full max-w-[420px] space-y-6">
        {children}
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our{' '}
          <Link href="/terms-and-conditions">Terms of Service</Link> and{' '}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
