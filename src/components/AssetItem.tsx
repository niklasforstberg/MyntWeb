import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState } from 'react';

interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
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
    currentValue: asset.currentValue || 0
  });

  const handleEdit = () => {
    onEdit({
      name: formData.name,
      description: formData.description || undefined,
      currentValue: formData.currentValue
    });
    setEditDialogOpen(false);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'currentValue' ? Number(event.target.value) : event.target.value
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