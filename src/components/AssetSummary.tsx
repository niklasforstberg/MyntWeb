import { Box, Typography } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import type { AssetsSummary } from '../hooks/useAssets';

interface AssetSummaryProps {
  summary: AssetsSummary;
}

const AssetSummary = ({ summary }: AssetSummaryProps) => {
  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: currencyCode || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center',
      gap: 1,
      mt: 2
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Total: {formatCurrency(summary.totalValue, summary.currencyCode)}
      </Typography>
    </Box>
  );
};

export default AssetSummary; 