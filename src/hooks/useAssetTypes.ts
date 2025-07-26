import { useQuery } from '@tanstack/react-query';
import { getAssetTypes } from '../api/axios';
import { useAuth } from '../auth/useAuth';

export interface AssetType {
  id: number;
  name: string;
  isAsset: boolean;
  isPhysical: boolean;
}

export const useAssetTypes = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['assetTypes'],
    queryFn: getAssetTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isAuthenticated, // Only fetch when authenticated
  });
}; 