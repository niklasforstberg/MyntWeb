import { Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAssets, createAsset } from '../api/axios';
import { ContentBox, FlexBetween } from '../theme/styled';
import AssetList from '../components/AssetList';
import AddAssetForm from '../components/AddAssetForm';

interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await getAssets();
      setAssets(data);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 500) {
        setAssets([]);
        setError(null);
      } else {
        setError('Failed to load assets');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAddAsset = async (newAsset: Omit<Asset, 'id'>) => {
    try {
      setCreating(true);
      await createAsset({
        name: newAsset.name,
        description: newAsset.description,
        assetTypeId: newAsset.assetTypeId,
        financialGroupId: newAsset.financialGroupId,
        initialValue: newAsset.currentValue
      });
      await fetchAssets();
      setAddFormOpen(false);
    } catch (err) {
      console.error('Error creating asset:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleEditAsset = (id: number, updatedData: Partial<Asset>) => {
    setAssets(prev =>
      prev.map(asset => asset.id === id ? { ...asset, ...updatedData } : asset)
    );
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
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

        {loading && (
          <Typography color="text.secondary">Loading assets...</Typography>
        )}

        {error && (
          <Typography color="error">{error}</Typography>
        )}

        {!loading && !error && (
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
        creating={creating}
      />
    </>
  );
};

export default Assets; 