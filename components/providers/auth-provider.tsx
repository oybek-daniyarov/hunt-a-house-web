'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = getCookie('auth_token');
    setIsAuthenticated(!!token);
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
