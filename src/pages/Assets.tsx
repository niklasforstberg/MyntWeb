import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { ContentBox, FlexBetween } from '../theme/styled';
import AssetList from '../components/AssetList';
import AssetSummary from '../components/AssetSummary';
import AddAssetForm from '../components/AddAssetForm';
import { useAssets, useAssetsSummary } from '../hooks/useAssets';
import { useUpdateAsset, useDeleteAsset } from '../hooks/useAssetMutations';
import type { Asset } from '../hooks/useAssets';

const Assets = () => {
  const [addFormOpen, setAddFormOpen] = useState(false);
  
  // TanStack Query hooks
  const { data: assets = [], isLoading, error } = useAssets();
  const { data: summary, isLoading: summaryLoading } = useAssetsSummary();
  const updateAssetMutation = useUpdateAsset();
  const deleteAssetMutation = useDeleteAsset();

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
          <>
            <AssetList 
              assets={assets}
              onEditAsset={handleEditAsset}
              onDeleteAsset={handleDeleteAsset}
            />
            
            {summary && !summaryLoading && (
              <AssetSummary 
                summary={summary}
              />
            )}
          </>
        )}
      </ContentBox>

      <AddAssetForm 
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
      />
    </>
  );
};

export default Assets; 