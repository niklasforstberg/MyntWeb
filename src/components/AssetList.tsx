import { Box, Typography } from '@mui/material';
import AssetItem from './AssetItem';
import type { Asset } from '../hooks/useAssets';

interface AssetListProps {
  assets: Asset[];
  onEditAsset: (id: number, updatedData: Partial<Asset>) => void;
  onDeleteAsset: (id: number) => void;
}

const AssetList = ({ assets, onEditAsset, onDeleteAsset }: AssetListProps) => {
  if (assets.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        No assets found. Add your first asset to get started.
      </Typography>
    );
  }

  return (
    <Box sx={{
      borderColor: 'divider',
      overflow: 'hidden'
    }}>
      {assets.map((asset) => (
        <AssetItem 
          key={asset.id} 
          asset={asset}
          onEdit={(updatedData) => onEditAsset(asset.id, updatedData)}
          onDelete={() => onDeleteAsset(asset.id)}
        />
      ))}
    </Box>
  );
};

export default AssetList; 