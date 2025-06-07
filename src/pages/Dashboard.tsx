import { Typography, Grid } from '@mui/material';
import { useAuth } from '../auth/useAuth';
import { 
  PageContainer, 
  ContentBox, 
  StatsCard, 
  ResponsiveGrid, 
  FlexBetween 
} from '../theme/styled';
import { AddAssetCard } from '../components/AddAssetCard';

const Dashboard = () => {
  const { userEmail } = useAuth();

  const handleAssetCreated = () => {
    // Handle asset creation - could refresh data, show notification, etc.
    console.log('Asset created successfully!');
    // TODO: Refresh dashboard data when we have asset listing
  };

  return (
    <PageContainer>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Welcome to Mynt Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hello, {userEmail}!
        </Typography>
      </ContentBox>

      {/* Example of using the new styled components with Eczar for numbers */}
      <ResponsiveGrid>
        <StatsCard>
          <FlexBetween>
            <Typography variant="h6">Total Balance</Typography>
            <Typography variant="number1" color="primary">
              $12,345
            </Typography>
          </FlexBetween>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            +5.2% from last month
          </Typography>
        </StatsCard>

        {/* Add Asset Card */}
        <AddAssetCard onAssetCreated={handleAssetCreated} />
        
      </ResponsiveGrid>
    </PageContainer>
  );
};

export default Dashboard; 