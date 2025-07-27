import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { ContentBox, FlexBetween } from '../theme/styled';
import AssetList from '../components/AssetList';
import AssetSummary from '../components/AssetSummary';
import AddDebtForm from '../components/AddDebtForm';
import { useAssets, useAssetsSummary } from '../hooks/useAssets';
import { useUpdateAsset, useDeleteAsset } from '../hooks/useAssetMutations';
import type { Asset } from '../hooks/useAssets';

const Debts = () => {
  const [addFormOpen, setAddFormOpen] = useState(false);
  
  // TanStack Query hooks - get debts only (isAsset=false)
  const { data: debts = [], isLoading, error } = useAssets(false); // Only get debts, not assets
  const { data: allSummary, isLoading: summaryLoading } = useAssetsSummary();
  const updateAssetMutation = useUpdateAsset();
  const deleteAssetMutation = useDeleteAsset();

  // Create debt summary from the overall summary
  const debtSummary = allSummary ? {
    ...allSummary,
    totalSummary: allSummary.debtSummary * -1 // Make negative for debts
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