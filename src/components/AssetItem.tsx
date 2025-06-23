import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
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

interface AssetItemProps {
  asset: Asset;
  onEdit: (updatedData: Partial<Asset>) => void;
  onDelete: () => void;
}

const AssetItem = ({ asset, onEdit, onDelete }: AssetItemProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: asset.name,
    description: asset.description || '',
    currentValue: asset.currentValue || 0,
    assetTypeId: asset.assetTypeId || ''
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
    if (editDialogOpen) {
      loadAssetTypes();
    }
  }, [editDialogOpen]);

  const handleEdit = () => {
    onEdit({
      name: formData.name,
      description: formData.description || undefined,
      currentValue: formData.currentValue,
      assetTypeId: formData.assetTypeId ? Number(formData.assetTypeId) : undefined
    });
    setEditDialogOpen(false);
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
                <Typography variant="h6">{asset.name}</Typography>
                {asset.description && (
                    <Typography variant="body2" color="text.secondary">
                        {asset.description}
                    </Typography>
                )}
            </Box>
            {asset.currentValue && (
                <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
                ${asset.currentValue}
                </Typography>
            )}
        <Box>
          <IconButton onClick={() => setEditDialogOpen(true)} size="small">
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete} size="small" color="error">
            <Delete />
          </IconButton>
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
            label="Current Value"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.currentValue}
            onChange={handleInputChange('currentValue')}
          />
        </DialogContent>
        <DialogActions>
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