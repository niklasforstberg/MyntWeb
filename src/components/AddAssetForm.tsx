import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useCurrencies, type Currency } from '../hooks/useCurrencies';
import { useAssetTypes, type AssetType } from '../hooks/useAssetTypes';
import { useCreateAsset } from '../hooks/useAssetMutations';

interface AddAssetFormProps {
  open: boolean;
  onClose: () => void;
}

const AddAssetForm = ({ open, onClose }: AddAssetFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currentValue: '',
    assetTypeId: '',
    currencyCode: ''
  });
  const { data: currencies = [] } = useCurrencies();
  const { data: assetTypes = [], isLoading: loadingAssetTypes } = useAssetTypes();
  const createAssetMutation = useCreateAsset();

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    try {
      await createAssetMutation.mutateAsync({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        initialValue: formData.currentValue ? Number(formData.currentValue) : undefined,
        assetTypeId: formData.assetTypeId ? Number(formData.assetTypeId) : undefined,
        currencyCode: formData.currencyCode || undefined
      });

      // Reset form and close dialog
      setFormData({ name: '', description: '', currentValue: '', assetTypeId: '', currencyCode: '' });
      onClose();
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', currentValue: '', assetTypeId: '', currencyCode: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
            {assetTypes.map((type: AssetType) => (
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
          rows={2}
          variant="outlined"
          value={formData.description}
          onChange={handleInputChange('description')}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Current Value (Optional)"
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.name.trim() || createAssetMutation.isPending}
        >
          {createAssetMutation.isPending ? <CircularProgress size={20} /> : 'Create Asset'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAssetForm; 