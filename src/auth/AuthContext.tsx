import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getDecodedToken, isTokenValid, clearToken, getUserEmail, getUserRole } from './authUtils';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userRole: string | null;
  logout: () => void;
  setAuthStatus: (status: boolean) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  userRole: null,
  logout: () => {},
  setAuthStatus: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (isTokenValid()) { 
        const email = getUserEmail();
        const role = getUserRole();
        
        if (email && role) {
          setIsAuthenticated(true);
          setUserEmail(email);
          setUserRole(role);
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 