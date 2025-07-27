import { Box, Card, CardContent, Typography } from '@mui/material';
import { AccountBalance, TrendingUp, TrendingDown } from '@mui/icons-material';
import type { AssetSummaryResponse } from '../hooks/useAssets';

interface TotalSummaryProps {
  summary: AssetSummaryResponse;
}

const TotalSummary = ({ summary }: TotalSummaryProps) => {
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
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Loading summary...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {formatCurrency(summary.totalSummary, summary.currencyCode)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Total Portfolio Value
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <TrendingUp sx={{ color: 'success.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(summary.assetSummary, summary.currencyCode)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assets ({summary.assetCount})
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <TrendingDown sx={{ color: 'error.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(summary.debtSummary, summary.currencyCode)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Debts ({summary.debtCount})
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalSummary; 