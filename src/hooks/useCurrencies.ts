import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '../api/axios';
import { useAuth } from '../auth/useAuth';

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol?: string;
  symbolPosition?: number; // 0 = before, 1 = after
}

export const useCurrencies = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: 30 * 60 * 1000, //currencies don't change often
    enabled: isAuthenticated, // Only fetch when authenticated
  });
}; 