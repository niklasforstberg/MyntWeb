import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getDecodedToken, isTokenValid, clearToken } from './authUtils';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userRole: string | null;
  logout: () => void;
  setAuthStatus: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  userRole: null,
  logout: () => {},
  setAuthStatus: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (isTokenValid()) { 
        const decoded = getDecodedToken();
        if (decoded) {
          setIsAuthenticated(true);
          setUserEmail(decoded.email);
          setUserRole(decoded.role);
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserRole(null);
  };

  const setAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
    if (!status) {
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        userRole,
        logout: handleLogout,
        setAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 