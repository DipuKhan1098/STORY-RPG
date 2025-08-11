/**
 * AdminAuthContext.tsx
 * PURPOSE:
 *  - Global auth state for the admin panel.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AdminAuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  verify: () => Promise<boolean>;
  getAuthHeader: () => Record<string, string>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const { token: newToken } = await response.json();
      setToken(newToken);
      setIsAuthenticated(true);
      localStorage.setItem('admin_token', newToken);
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
  }, []);

  const verify = useCallback(async (): Promise<boolean> => {
    const storedToken = token || localStorage.getItem('admin_token');
    if (!storedToken) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        setToken(storedToken);
        setIsAuthenticated(true);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
      return false;
    }
  }, [token, API_BASE_URL, logout]);

  const getAuthHeader = useCallback((): Record<string, string> => {
    const currentToken = token || localStorage.getItem('admin_token');
    return currentToken ? { 'Authorization': `Bearer ${currentToken}` } : {};
  }, [token]);

  // Verify token on mount
  useEffect(() => {
    setIsLoading(true);
    verify().finally(() => setIsLoading(false));
  }, [verify]);

  const value: AdminAuthContextType = {
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    verify,
    getAuthHeader,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};