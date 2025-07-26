import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserSettings, updateUserSettings } from '../api/axios';
import { useAuth } from '../auth/useAuth';

export interface UserSettings {
  preferredCurrency?: string;
}

export const useUserSettings = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  
  const query = useQuery({
    queryKey: ['userSettings'],
    queryFn: getUserSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const mutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (data) => {
      // Update the cache with the new settings
      queryClient.setQueryData(['userSettings'], data);
    },
  });

  return {
    ...query,
    updateSettings: mutation.mutate,
    updateSettingsAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
  };
}; 