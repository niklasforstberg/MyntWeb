import { Box, Card, CardContent, Typography } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';
import type { AssetsSummary } from '../hooks/useAssets';

interface TotalSummaryProps {
  summary: AssetsSummary;
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

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {formatCurrency(summary.totalValue, summary.currencyCode)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Total Portfolio Value
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalSummary; 