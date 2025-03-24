import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { AuthProvider } from '@/components/providers/auth-provider';
import { EchoProvider } from '@/lib/echo/echo-provider';

const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NuqsAdapter>
          <EchoProvider>{children}</EchoProvider>
        </NuqsAdapter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default WithProviders;
