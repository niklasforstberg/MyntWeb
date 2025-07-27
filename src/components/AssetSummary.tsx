import { Box, Typography } from '@mui/material';
import type { AssetSummaryResponse } from '../hooks/useAssets';

interface AssetSummaryProps {
  summary: AssetSummaryResponse;
}

const AssetSummary = ({ summary }: AssetSummaryProps) => {
  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Defensive programming - check if summary exists
  if (!summary) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        gap: 1,
        mt: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Total: Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center',
      gap: 1,
      mt: 2
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Total: {formatCurrency(summary.totalSummary, summary.currencyCode)}
      </Typography>
    </Box>
  );
};

export default AssetSummary; 