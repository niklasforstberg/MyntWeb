import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'mynt_auth_token';

interface DecodedToken {
  exp: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getDecodedToken = (): DecodedToken | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const getUserEmail = (): string | null => {
  const decoded = getDecodedToken();
  return decoded ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] : null;
};

export const getUserRole = (): string | null => {
  const decoded = getDecodedToken();
  return decoded ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
};

export const getUserId = (): string | null => {
  const decoded = getDecodedToken();
  return decoded ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;
}; 