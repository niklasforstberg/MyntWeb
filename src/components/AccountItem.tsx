import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState } from 'react';

interface Account {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

interface AccountItemProps {
  account: Account;
  onEdit: (updatedData: Partial<Account>) => void;
  onDelete: () => void;
}

const AccountItem = ({ account, onEdit, onDelete }: AccountItemProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: account.name,
    description: account.description || '',
    currentValue: account.currentValue || 0
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
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:last-child': { borderBottom: 'none' }
      }}>
        <Box>
          <Typography variant="h6">{account.name}</Typography>
          {account.description && (
            <Typography variant="body2" color="text.secondary">
              {account.description}
            </Typography>
          )}
          {account.currentValue && (
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 0.5 }}>
              ${account.currentValue.toLocaleString()}
            </Typography>
          )}
        </Box>
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

export default AccountItem; 