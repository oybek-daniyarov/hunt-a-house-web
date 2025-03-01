'use client';

import * as React from 'react';
import { useEffect } from 'react';

import { checkSession, clearSession } from '@/lib/client/laravel/auth';
import { logout as backendLogout } from '@/lib/data/laravel/auth/auth.api';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: App.Data.User.UserData | null;
  setUser: (user: App.Data.User.UserData | null) => void;
  isLoading: boolean;
  logout: () => Promise<boolean>;
  refreshAuth: () => Promise<void>;
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
  const [isLoading, setIsLoading] = React.useState(true);

  // Function to check authentication status
  const refreshAuth = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const sessionResponse = await checkSession();

      setIsAuthenticated(sessionResponse.isAuthenticated || false);

      if (sessionResponse.isAuthenticated && sessionResponse.user) {
        setUser(sessionResponse.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<boolean> => {
    try {
      // First clear the session cookie
      await clearSession();

      // Then try to logout from the backend
      try {
        await backendLogout();
      } catch (backendError) {
        console.warn(
          'Backend logout failed, but session was cleared locally:',
          backendError
        );
      }

      // Update local state
      setIsAuthenticated(false);
      setUser(null);

      // Return success even if backend fails, as we've cleared the session locally
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  // Check authentication on initial load
  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        isLoading,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
