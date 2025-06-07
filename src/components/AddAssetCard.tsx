import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axiosInstance from '../api/axios';
import { StatsCard, FlexBetween, FlexColumn } from '../theme/styled';

interface AssetType {
  id: number;
  name: string;
  isAsset: boolean;
  isPhysical: boolean;
}

interface AssetCreateRequest {
  name: string;
  description: string;
  financialGroupId?: number;
  assetTypeId?: number;
}

interface AddAssetCardProps {
  onAssetCreated?: () => void;
}

export const AddAssetCard: React.FC<AddAssetCardProps> = ({ onAssetCreated }) => {
  const [formData, setFormData] = useState<AssetCreateRequest>({
    name: '',
    description: '',
    financialGroupId: undefined,
    assetTypeId: undefined,
  });
  
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch asset types on component mount
  useEffect(() => {
    fetchAssetTypes();
  }, []);

  const fetchAssetTypes = async () => {
    try {
      setIsLoadingTypes(true);
      const response = await axiosInstance.get('/api/asset-types');
      setAssetTypes(response.data);
    } catch (err) {
      setError('Failed to load asset types');
      console.error('Error fetching asset types:', err);
    } finally {
      setIsLoadingTypes(false);
    }
  };

  const handleInputChange = (field: keyof AssetCreateRequest) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? undefined : value
    }));
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Asset name is required');
      return false;
    }
    if (!formData.assetTypeId) {
      setError('Please select an asset type');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      await axiosInstance.post('/api/assets', {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
      
      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        financialGroupId: undefined,
        assetTypeId: undefined,
      });
      
      // Hide form and show success state
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 2000);
      
      // Notify parent component
      onAssetCreated?.();
      
    } catch (err: any) {
      console.error('Error creating asset:', err);
      setError(err.response?.data?.message || 'Failed to create asset');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
    setSuccess(false);
    setFormData({
      name: '',
      description: '',
      financialGroupId: undefined,
      assetTypeId: undefined,
    });
  };

  if (!showForm) {
    return (
      <StatsCard 
        sx={{ 
          cursor: 'pointer',
          border: '2px dashed',
          borderColor: 'divider',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          }
        }}
        onClick={() => setShowForm(true)}
      >
        <FlexColumn sx={{ alignItems: 'center', py: 2 }}>
          <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" color="primary">
            Add New Asset
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Click to create a new asset
          </Typography>
        </FlexColumn>
      </StatsCard>
    );
  }

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create New Asset
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Asset created successfully!
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Asset Name"
            value={formData.name}
            onChange={handleInputChange('name')}
            margin="normal"
            required
            disabled={isLoading}
            placeholder="e.g., Investment Account, Real Estate Property"
          />

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={handleInputChange('description')}
            margin="normal"
            multiline
            rows={3}
            disabled={isLoading}
            placeholder="Optional description of the asset"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Asset Type</InputLabel>
            <Select
              value={formData.assetTypeId || ''}
              onChange={handleInputChange('assetTypeId')}
              label="Asset Type"
              disabled={isLoading || isLoadingTypes}
            >
              {isLoadingTypes ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Loading asset types...
                </MenuItem>
              ) : (
                assetTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name} {type.isPhysical ? '(Physical)' : '(Digital)'}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Financial Group ID (Optional)"
            value={formData.financialGroupId || ''}
            onChange={handleInputChange('financialGroupId')}
            margin="normal"
            type="number"
            disabled={isLoading}
            placeholder="Leave blank if not applicable"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button 
          onClick={handleCancel} 
          disabled={isLoading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || !formData.name.trim() || !formData.assetTypeId}
          startIcon={isLoading ? <CircularProgress size={20} /> : <AddIcon />}
        >
          {isLoading ? 'Creating...' : 'Create Asset'}
        </Button>
      </CardActions>
    </Card>
  );
}; 