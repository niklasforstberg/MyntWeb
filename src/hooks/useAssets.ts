import { useQuery } from '@tanstack/react-query';
import { getAssets, getAssetsSummary } from '../api/axios';
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

export interface AssetsSummary {
  totalAssets: number;
  totalValue: number;
  currencyCode: string;
}

export interface AssetSummaryResponse {
  assetSummary: number;
  assetCount: number;
  debtSummary: number;
  debtCount: number;
  totalSummary: number;
  lastUpdated: string;
  currencyCode: string;
}

export const useAssets = (isAsset?: boolean) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['assets', isAsset],
    queryFn: () => getAssets(isAsset),
    staleTime: 2 * 60 * 1000, // 2 minutes - assets change more frequently
    enabled: isAuthenticated, // Only fetch when authenticated
  });
};

export const useAssetsSummary = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery<AssetSummaryResponse>({
    queryKey: ['assets', 'summary'],
    queryFn: getAssetsSummary,
    staleTime: 2 * 60 * 1000, // 2 minutes - summary changes with assets
    enabled: isAuthenticated, // Only fetch when authenticated
  });
}; 