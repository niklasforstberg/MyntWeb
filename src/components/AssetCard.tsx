import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

interface AssetRowProps {
  asset: Asset;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
}

const AssetRow = ({ asset, onEdit, onDelete }: AssetRowProps) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
          {asset.name || 'Unnamed Asset'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {asset.description || 'No description'}
        </Typography>
      </Box>
      <Typography 
        variant="h6" 
        color="primary" 
        sx={{ 
          fontFamily: 'Eczar',
          mx: 3,
          minWidth: '120px',
          textAlign: 'right'
        }}
      >
        {asset.currentValue ? `$${asset.currentValue.toLocaleString()}` : 'Value not set'}
      </Typography>
      <Box>
        <IconButton size="small" onClick={() => onEdit?.(asset)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete?.(asset)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AssetRow; 