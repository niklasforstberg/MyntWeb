import { useQuery } from '@tanstack/react-query';
import { getAssetTypes } from '../api/axios';

export interface AssetType {
  id: number;
  name: string;
  isAsset: boolean;
  isPhysical: boolean;
}

export const useAssetTypes = () => {
  return useQuery({
    queryKey: ['assetTypes'],
    queryFn: getAssetTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 