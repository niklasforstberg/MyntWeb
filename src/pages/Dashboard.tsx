import { Typography, Button } from '@mui/material';
import { useAuth } from '../auth/useAuth';
import { useState, useEffect } from 'react';
import { getAssets, createAsset } from '../api/axios';
import { 
  PageContainer, 
  ContentBox, 
  FlexBetween 
} from '../theme/styled';
import AssetSummary from '../components/AssetSummary';
import AssetList from '../components/AssetList';
import AddAssetForm from '../components/AddAssetForm';
import { getToken, isTokenValid } from '../auth/authUtils';

interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

const Dashboard = () => {
  const { userEmail, isAuthenticated } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  
  // Debug authentication state
  console.log('Dashboard - isAuthenticated:', isAuthenticated);
  console.log('Dashboard - userEmail:', userEmail);
  console.log('Dashboard - token exists:', !!getToken());
  console.log('Dashboard - token valid:', isTokenValid());

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await getAssets();
      console.log('Dashboard: Assets fetched:', data);
      setAssets(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching assets:', err);
      // Don't set error state for 500 errors - this is a backend issue
      // Only show error for actual auth/network issues
      if (err.response?.status === 500) {
        console.log('Backend error (500) - likely database issue, continuing with empty assets');
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
      
      // Refresh the assets list and close form
      await fetchAssets();
      setAddFormOpen(false);
      
      console.log('Asset created successfully!');
    } catch (err) {
      console.error('Error creating asset:', err);
      // You might want to show an error message to the user here
    } finally {
      setCreating(false);
    }
  };

  const handleEditAsset = (id: number, updatedData: Partial<Asset>) => {
    setAssets(prev =>
      prev.map(asset => asset.id === id ? { ...asset, ...updatedData } : asset)
    );
    // TODO: Add API call to update asset
    console.log('Edit asset:', id, updatedData);
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
    // TODO: Add API call to delete asset
    console.log('Delete asset:', id);
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