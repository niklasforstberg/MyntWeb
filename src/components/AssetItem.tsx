import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useAssetTypes, type AssetType } from '../hooks/useAssetTypes';
import { useCurrencies, type Currency } from '../hooks/useCurrencies';
import { useUpdateAssetValue } from '../hooks/useAssetMutations';
import type { Asset } from '../hooks/useAssets';
import { formatCurrencyValue } from '../utils/currencyUtils';

interface AssetItemProps {
  asset: Asset;
  onEdit: (updatedData: Partial<Asset>) => void;
  onDelete: () => void;
}

const AssetItem = ({ asset, onEdit, onDelete }: AssetItemProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isValueEditing, setIsValueEditing] = useState(false);
  const [inlineValue, setInlineValue] = useState(asset.currentValue || 0);
  const [formData, setFormData] = useState({
    name: asset.name,
    description: asset.description || '',
    currentValue: asset.currentValue || 0,
    assetTypeId: asset.assetTypeId ? String(asset.assetTypeId) : '',
    currencyCode: asset.currencyCode || ''
  });

  // TanStack Query hooks
  const { data: assetTypes = [], isLoading: loadingAssetTypes } = useAssetTypes();
  const { data: currencies = [], isLoading: loadingCurrencies } = useCurrencies();
  const updateAssetValueMutation = useUpdateAssetValue();

  // Determine if this asset is a debt or asset based on its asset type
  const currentAssetType = assetTypes.find((type: AssetType) => type.id === asset.assetTypeId);
  const isDebt = currentAssetType ? !currentAssetType.isAsset : false;
  
  // Filter asset types based on whether this is a debt or asset
  const filteredAssetTypes = assetTypes.filter((type: AssetType) => type.isAsset === !isDebt);

  // Update form data when asset changes or dialog opens
  const handleDialogOpen = () => {
    setFormData({
      name: asset.name,
      description: asset.description || '',
      currentValue: asset.currentValue || 0,
      assetTypeId: asset.assetTypeId ? String(asset.assetTypeId) : '',
      currencyCode: asset.currencyCode || ''
    });
    setEditDialogOpen(true);
  };

  // Inline value editing handlers
  const handleValueEditStart = () => {
    setInlineValue(asset.currentValue || 0);
    setIsValueEditing(true);
  };

  const handleValueSave = async () => {
    try {
      await updateAssetValueMutation.mutateAsync({ 
        id: asset.id, 
        value: inlineValue 
      });
      setIsValueEditing(false);
    } catch (error) {
      console.error('Failed to update value:', error);
      // Revert to original value on error
      setInlineValue(asset.currentValue || 0);
      setIsValueEditing(false);
    }
  };

  const handleValueCancel = () => {
    setInlineValue(asset.currentValue || 0);
    setIsValueEditing(false);
  };

  const handleValueKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleValueSave();
    } else if (event.key === 'Escape') {
      handleValueCancel();
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Only allow numbers, decimal points, and empty string
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInlineValue(value === '' ? 0 : Number(value));
    }
  };

  const handleEdit = async () => {
    try {
      const updateData = {
        name: formData.name,
        description: formData.description || undefined,
        currentValue: formData.currentValue,
        assetTypeId: formData.assetTypeId ? Number(formData.assetTypeId) : undefined,
        currencyCode: formData.currencyCode || undefined
      };
      console.log('Sending update data:', updateData); // Debug log
      await onEdit(updateData);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update asset:', error);
      // Keep dialog open on error so user can see the error and try again
    }
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'currentValue' ? Number(event.target.value) : event.target.value
    }));
  };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
             <Box display="flex" alignItems="baseline" gap={1} flex={1}>
                <Typography 
                  variant={asset.name ? "h6" : "body1"}
                  onClick={handleDialogOpen}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                    color: asset.name ? 'inherit' : 'text.secondary'
                  }}
                >
                  {asset.name || 'Unnamed Asset'}
                </Typography>
                {asset.description && (
                    <Typography variant="body2" color="text.secondary">
                        {asset.description}
                    </Typography>
                )}
            </Box>
            {isValueEditing ? (
              <TextField
                type="text"
                value={inlineValue}
                onChange={handleValueChange}
                onBlur={handleValueSave}
                onKeyDown={handleValueKeyDown}
                autoFocus
                size="small"
                sx={{ 
                  width: '120px',
                  mr: 2,
                  '& .MuiInputBase-input': {
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    textAlign: 'right'
                  }
                }}
              />
            ) : (
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mr: 2,
                  cursor: 'pointer',
                  '&:hover': { 
                    backgroundColor: 'action.hover',
                    borderRadius: 1,
                    px: 1
                  }
                }}
                onClick={handleValueEditStart}
              >
                {asset.currentValue !== undefined && asset.currentValue !== null
                  ? formatCurrencyValue(asset.currentValue, currencies.find((c: Currency) => c.code === asset.currencyCode))
                  : 'No data'
                }
              </Typography>
            )}
        <Box>
        </Box>
      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Asset</DialogTitle>
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
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Asset Type</InputLabel>
            <Select
              value={formData.assetTypeId}
              label="Asset Type"
              onChange={handleSelectChange('assetTypeId')}
              disabled={loadingAssetTypes}
            >
              <MenuItem value="">
                <em>Select an asset type</em>
              </MenuItem>
              {filteredAssetTypes.map((type: AssetType) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Description (Optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange('description')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Current Value"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.currentValue}
            onChange={handleInputChange('currentValue')}
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              value={formData.currencyCode}
              label="Currency"
              onChange={handleSelectChange('currencyCode')}
              disabled={loadingCurrencies}
            >
              <MenuItem value="">
                <em>Select currency</em>
              </MenuItem>
              {currencies.map((currency: Currency) => (
                <MenuItem key={currency.id} value={currency.code}>
                  {currency.code} - {currency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} color="error" sx={{ mr: 'auto' }}>
            Delete Asset
          </Button>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssetItem; 