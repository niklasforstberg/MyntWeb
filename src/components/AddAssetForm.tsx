import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAssetTypes } from '../api/axios';

interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

interface AssetType {
  id: number;
  name: string;
  isAsset: boolean;
  isPhysical: boolean;
}

interface AddAssetFormProps {
  open: boolean;
  onClose: () => void;
  onAddAsset: (newAsset: Omit<Asset, 'id'>) => void;
  creating?: boolean;
}

const AddAssetForm = ({ open, onClose, onAddAsset, creating = false }: AddAssetFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currentValue: '',
    assetTypeId: ''
  });
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [loadingAssetTypes, setLoadingAssetTypes] = useState(false);

  const loadAssetTypes = async () => {
    try {
      setLoadingAssetTypes(true);
      const data = await getAssetTypes();
      setAssetTypes(data);
    } catch (error) {
      console.error('Error loading asset types:', error);
    } finally {
      setLoadingAssetTypes(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadAssetTypes();
    }
  }, [open]);

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

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    onAddAsset({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      currentValue: formData.currentValue ? Number(formData.currentValue) : undefined,
      assetTypeId: formData.assetTypeId ? Number(formData.assetTypeId) : undefined
    });

    // Reset form
    setFormData({ name: '', description: '', currentValue: '', assetTypeId: '' });
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', currentValue: '', assetTypeId: '' });
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
            {assetTypes.map((type) => (
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
          label="Current Value (Optional)"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.currentValue}
          onChange={handleInputChange('currentValue')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.name.trim() || creating}
        >
          {creating ? <CircularProgress size={20} /> : 'Create Asset'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAssetForm; 