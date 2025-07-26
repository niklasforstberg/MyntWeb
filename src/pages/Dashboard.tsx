import { Typography, Button } from '@mui/material';
import { useAuth } from '../auth/useAuth';
import { useState } from 'react';
import { 
  PageContainer, 
  ContentBox, 
  FlexBetween 
} from '../theme/styled';
import AssetSummary from '../components/AssetSummary';
import AssetList from '../components/AssetList';
import AddAssetForm from '../components/AddAssetForm';
import { useAssets } from '../hooks/useAssets';
import { useCreateAsset, useUpdateAsset, useDeleteAsset } from '../hooks/useAssetMutations';
import type { Asset } from '../hooks/useAssets';

const Dashboard = () => {
  const { userEmail } = useAuth();
  const [addFormOpen, setAddFormOpen] = useState(false);
  
  // TanStack Query hooks
  const { data: assets = [], isLoading, error } = useAssets();
  const createAssetMutation = useCreateAsset();
  const updateAssetMutation = useUpdateAsset();
  const deleteAssetMutation = useDeleteAsset();

  const handleAddAsset = async (newAsset: Omit<Asset, 'id'>) => {
    try {
      await createAssetMutation.mutateAsync({
        name: newAsset.name,
        description: newAsset.description,
        assetTypeId: newAsset.assetTypeId,
        financialGroupId: newAsset.financialGroupId,
        currencyCode: newAsset.currencyCode,
        initialValue: newAsset.currentValue
      });
      setAddFormOpen(false);
    } catch (err) {
      console.error('Error creating asset:', err);
    }
  };

  const handleEditAsset = async (id: number, updatedData: Partial<Asset>) => {
    try {
      await updateAssetMutation.mutateAsync({ id, data: updatedData });
    } catch (err) {
      console.error('Error updating asset:', err);
    }
  };

  const handleDeleteAsset = async (id: number) => {
    try {
      await deleteAssetMutation.mutateAsync(id);
    } catch (err) {
      console.error('Error deleting asset:', err);
    }
  };

  return (
    <>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Welcome to Mynt Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hello, {userEmail}!
        </Typography>
      </ContentBox>

      {/* Asset Summary Section */}
      <ContentBox sx={{ mt: 3 }}>
        <AssetSummary assets={assets} />
      </ContentBox>

      {/* Quick Actions */}
      <ContentBox sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the navigation menu to manage your assets, view analytics, and adjust settings.
        </Typography>
      </ContentBox>
    </>
  );
};

export default Dashboard; 