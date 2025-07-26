import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAsset, updateAsset, deleteAsset, updateAssetValue } from '../api/axios';
import type { Asset } from './useAssets';

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      // Invalidate and refetch assets list and summary
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data, currentValue }: { id: number; data: Partial<Asset>; currentValue?: number }) => {
      // Update asset details
      await updateAsset(id, data);
      
      // Update asset value if provided
      if (currentValue !== undefined) {
        await updateAssetValue(id, currentValue);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch assets list and summary
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useUpdateAssetValue = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, value }: { id: number; value: number }) => {
      return updateAssetValue(id, value);
    },
    onSuccess: () => {
      // Invalidate and refetch assets list and summary
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      // Invalidate and refetch assets list and summary
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
}; 