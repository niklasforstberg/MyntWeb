import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '../api/axios';

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol?: string;
}

export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: 10 * 60 * 1000, // 10 minutes - currencies don't change often
  });
}; 