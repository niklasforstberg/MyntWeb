import { useQuery } from '@tanstack/react-query';
import { getAssets } from '../api/axios';
import { useAuth } from '../auth/useAuth';

export interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
  currencyCode?: string;
}

export const useAssets = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
    staleTime: 2 * 60 * 1000, // 2 minutes - assets change more frequently
    enabled: isAuthenticated, // Only fetch when authenticated
  });
}; 