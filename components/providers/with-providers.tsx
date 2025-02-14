import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { AuthProvider } from '@/components/providers/auth-provider';

const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default WithProviders;
