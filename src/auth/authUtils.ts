import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'mynt_auth_token';

interface DecodedToken {
  exp: number;
  email: string;
  role: string;
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