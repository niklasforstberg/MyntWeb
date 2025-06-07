import { Typography, Grid, Button, Card, CardContent, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material';
import { useAuth } from '../auth/useAuth';
import { useState, useEffect } from 'react';
import { getAssets, createAsset } from '../api/axios';
import { 
  PageContainer, 
  ContentBox, 
  StatsCard, 
  ResponsiveGrid, 
  FlexBetween 
} from '../theme/styled';

interface Asset {
  id: number;
  name: string;
  description?: string;
  value?: number; // This might not be in the API yet, but we'll prepare for it
  assetTypeId?: number;
  financialGroupId?: number;
}

const Dashboard = () => {
  const { userEmail } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  
  // Add this debug line temporarily
  console.log('Dashboard userEmail:', userEmail);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await getAssets();
      setAssets(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError('Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
    setFormData({ name: '', description: '' });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFormData({ name: '', description: '' });
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCreateAsset = async () => {
    if (!formData.name.trim()) return;

    try {
      setCreating(true);
      await createAsset({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined
      });
      
      // Refresh the assets list and close dialog
      await fetchAssets();
      handleCloseDialog();
      
      console.log('Asset created successfully!');
    } catch (err) {
      console.error('Error creating asset:', err);
      // You might want to show an error message to the user here
    } finally {
      setCreating(false);
    }
  };

  return (
    <PageContainer>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Welcome to Mynt Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hello, {userEmail}!
        </Typography>
      </ContentBox>

      {/* Assets Section */}
      <ContentBox sx={{ mt: 3 }}>
        <FlexBetween sx={{ mb: 2 }}>
          <Typography variant="h5">Your Assets</Typography>
          <Button 
            variant="contained" 
            onClick={handleOpenDialog}
            sx={{ 
              minHeight: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              px: 2
            }}
          >
            +
          </Button>
        </FlexBetween>

        {loading && (
          <Typography color="text.secondary">Loading assets...</Typography>
        )}

        {error && (
          <Typography color="error">{error}</Typography>
        )}

        {!loading && !error && (
          <ResponsiveGrid>
            {assets.length === 0 ? (
              <Typography color="text.secondary">
                No assets found. Click the + button to add your first asset.
              </Typography>
            ) : (
              assets.map((asset) => (
                <Card key={asset.id} sx={{ minHeight: '120px' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {asset.name || 'Unnamed Asset'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {asset.description || 'No description'}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" color="primary" sx={{ fontFamily: 'Eczar' }}>
                        {asset.value ? `$${asset.value.toLocaleString()}` : 'Value not set'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </ResponsiveGrid>
        )}
      </ContentBox>

      {/* Stats Section */}
      <ResponsiveGrid sx={{ mt: 3 }}>
        <StatsCard>
          <FlexBetween>
            <Typography variant="h6">Total Assets</Typography>
            <Typography variant="h4" sx={{ fontFamily: 'Eczar' }}>
              {assets.length}
            </Typography>
          </FlexBetween>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Total number of assets
          </Typography>
        </StatsCard>
        
      </ResponsiveGrid>

      {/* Create Asset Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Asset Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange('name')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description (Optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateAsset} 
            variant="contained"
            disabled={!formData.name.trim() || creating}
          >
            {creating ? <CircularProgress size={20} /> : 'Create Asset'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Dashboard; 