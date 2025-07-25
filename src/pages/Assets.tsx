import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { ContentBox, FlexBetween } from '../theme/styled';
import AssetList from '../components/AssetList';
import AddAssetForm from '../components/AddAssetForm';
import { useAssets } from '../hooks/useAssets';
import { useCreateAsset, useUpdateAsset, useDeleteAsset } from '../hooks/useAssetMutations';
import type { Asset } from '../hooks/useAssets';

const Assets = () => {
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
      const { currentValue, ...assetData } = updatedData;
      await updateAssetMutation.mutateAsync({ 
        id, 
        data: assetData,
        currentValue: currentValue
      });
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
        <FlexBetween sx={{ mb: 2 }}>
          <Typography variant="h4">Assets</Typography>
          <Button 
            variant="contained" 
            onClick={() => setAddFormOpen(true)}
            sx={{ 
              minHeight: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              px: 2
            }}
          >
            Add Asset
          </Button>
        </FlexBetween>

        {isLoading && (
          <Typography color="text.secondary">Loading assets...</Typography>
        )}

        {error && (
          <Typography color="error">{error.message}</Typography>
        )}

        {!isLoading && !error && (
          <AssetList 
            assets={assets}
            onEditAsset={handleEditAsset}
            onDeleteAsset={handleDeleteAsset}
          />
        )}
      </ContentBox>

      <AddAssetForm 
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        onAddAsset={handleAddAsset}
        creating={createAssetMutation.isPending}
      />
    </>
  );
};

export default Assets; 