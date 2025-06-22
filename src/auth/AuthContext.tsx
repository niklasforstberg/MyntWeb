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
      console.log('AuthContext: Checking authentication...');
      
      if (isTokenValid()) { 
        console.log('AuthContext: Token is valid');
        const email = getUserEmail();
        const role = getUserRole();
        console.log('AuthContext: Email:', email, 'Role:', role);
        
        if (email && role) {
          setIsAuthenticated(true);
          setUserEmail(email);
          setUserRole(role);
          console.log('AuthContext: Set userEmail to:', email);
        } else {
          console.log('AuthContext: Could not get user info from token');
          handleLogout();
        }
      } else {
        console.log('AuthContext: Token is invalid or missing');
        handleLogout();
      }
      setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 