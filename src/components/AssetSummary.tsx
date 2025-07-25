import { Typography, Card, CardContent, Box } from '@mui/material';
import { StatsCard, FlexBetween } from '../theme/styled';

interface Asset {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
  currencyCode?: string;
}

interface AssetSummaryProps {
  assets: Asset[];
}

const AssetSummary = ({ assets }: AssetSummaryProps) => {
  const totalValue = assets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0);
  const totalAssets = assets.length;

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <StatsCard>
        <FlexBetween>
          <Typography variant="h6">Total Assets</Typography>
          <Typography variant="h4" sx={{ fontFamily: 'Eczar' }}>
            {totalAssets}
          </Typography>
        </FlexBetween>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Total number of assets
        </Typography>
      </StatsCard>

      <StatsCard>
        <FlexBetween>
          <Typography variant="h6">Total Value</Typography>
          <Typography variant="h4" sx={{ fontFamily: 'Eczar' }}>
            USD {totalValue.toLocaleString()}
          </Typography>
        </FlexBetween>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Combined asset value
        </Typography>
      </StatsCard>
    </Box>
  );
};

export default AssetSummary; 