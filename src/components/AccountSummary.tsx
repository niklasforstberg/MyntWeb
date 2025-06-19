import { Typography, Card, CardContent, Box } from '@mui/material';
import { StatsCard, FlexBetween } from '../theme/styled';

interface Account {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

interface AccountSummaryProps {
  accounts: Account[];
}

const AccountSummary = ({ accounts }: AccountSummaryProps) => {
  const totalValue = accounts.reduce((sum, account) => sum + (account.currentValue || 0), 0);
  const totalAccounts = accounts.length;

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <StatsCard>
        <FlexBetween>
          <Typography variant="h6">Total Assets</Typography>
          <Typography variant="h4" sx={{ fontFamily: 'Eczar' }}>
            {totalAccounts}
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
            ${totalValue.toLocaleString()}
          </Typography>
        </FlexBetween>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Combined asset value
        </Typography>
      </StatsCard>
    </Box>
  );
};

export default AccountSummary; 