import { useQuery } from '@tanstack/react-query';
import { getAssetTypes } from '../api/axios';
import { useAuth } from '../auth/useAuth';

export interface AssetType {
  id: number;
  name: string;
  isAsset: boolean;
  isPhysical: boolean;
}

export const useAssetTypes = (isAsset?: boolean) => {
  const { isAuthenticated } = useAuth();
  
  const query = useQuery({
    queryKey: ['assetTypes'], // Single query key - load all asset types once
    queryFn: () => getAssetTypes(), // No parameters - get all asset types
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  // Filter client-side based on isAsset parameter
  const filteredData = isAsset !== undefined 
    ? query.data?.filter((type: AssetType) => type.isAsset === isAsset) || []
    : query.data || [];

  return {
    ...query,
    data: filteredData,
  };
}; 