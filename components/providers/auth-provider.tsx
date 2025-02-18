'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { getCurrentUser } from '@/lib/data/laravel/auth/auth.api';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: App.Data.User.UserData | null;
  setUser: (user: App.Data.User.UserData | null) => void;
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
  const [user, setUser] = React.useState<App.Data.User.UserData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = getCookie('auth_token');
    const isAuth = !!token;
    setIsAuthenticated(isAuth);

    if (isAuth) {
      getCurrentUser().then((response) => {
        if (response.success && response.data) {
          setUser(response.data);
        }
      });
    } else {
      setUser(null);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
