import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material';
import { useState } from 'react';

interface Account {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

interface AddAccountFormProps {
  open: boolean;
  onClose: () => void;
  onAddAccount: (newAccount: Omit<Account, 'id'>) => void;
  creating?: boolean;
}

const AddAccountForm = ({ open, onClose, onAddAccount, creating = false }: AddAccountFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currentValue: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    onAddAccount({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      currentValue: formData.currentValue ? Number(formData.currentValue) : undefined
    });

    // Reset form
    setFormData({ name: '', description: '', currentValue: '' });
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', currentValue: '' });
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

export default AddAccountForm; 