import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { ContentBox, FlexBetween } from '../theme/styled';
import AssetList from '../components/AssetList';
import AssetSummary from '../components/AssetSummary';
import AddDebtForm from '../components/AddDebtForm';
import { useAssets, useAssetsSummary } from '../hooks/useAssets';
import { useAssetTypes } from '../hooks/useAssetTypes';
import { useUpdateAsset, useDeleteAsset } from '../hooks/useAssetMutations';
import type { Asset } from '../hooks/useAssets';
import type { AssetType } from '../hooks/useAssetTypes';

const Debts = () => {
  const [addFormOpen, setAddFormOpen] = useState(false);
  
  // TanStack Query hooks - filter for debts (isAsset=false)
  const { data: allAssets = [], isLoading, error } = useAssets();
  const { data: allSummary, isLoading: summaryLoading } = useAssetsSummary();
  const { data: assetTypes = [] } = useAssetTypes();
  const updateAssetMutation = useUpdateAsset();
  const deleteAssetMutation = useDeleteAsset();

  // Filter for debts only by checking asset type
  const debts = allAssets.filter((asset: Asset) => {
    const assetType = assetTypes.find((type: AssetType) => type.id === asset.assetTypeId);
    return assetType && !assetType.isAsset;
  });
  const debtSummary = allSummary ? {
    ...allSummary,
    totalValue: allSummary.totalValue * -1, // Make negative for debts
    totalCount: debts.length
  } : null;

  const handleEditDebt = async (id: number, updatedData: Partial<Asset>) => {
    try {
      const { currentValue, ...debtData } = updatedData;
      await updateAssetMutation.mutateAsync({ 
        id, 
        data: debtData,
        currentValue: currentValue
      });
    } catch (err) {
      console.error('Error updating debt:', err);
    }
  };

  const handleDeleteDebt = async (id: number) => {
    try {
      await deleteAssetMutation.mutateAsync(id);
    } catch (err) {
      console.error('Error deleting debt:', err);
    }
  };

  return (
    <>
      <ContentBox>
        <FlexBetween sx={{ mb: 2 }}>
          <Typography variant="h4">Debts</Typography>
          <Button 
            variant="contained" 
            onClick={() => setAddFormOpen(true)}
            sx={{ 
              minHeight: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              px: 2,
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark',
              }
            }}
          >
            Add Debt
          </Button>
        </FlexBetween>

        {isLoading && (
          <Typography color="text.secondary">Loading debts...</Typography>
        )}

        {error && (
          <Typography color="error">{error.message}</Typography>
        )}

        {!isLoading && !error && (
          <>
            <AssetList 
              assets={debts}
              onEditAsset={handleEditDebt}
              onDeleteAsset={handleDeleteDebt}
            />
            
            {debtSummary && !summaryLoading && (
              <AssetSummary 
                summary={debtSummary}
              />
            )}
          </>
        )}
      </ContentBox>

      <AddDebtForm 
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
      />
    </>
  );
};

export default Debts; 