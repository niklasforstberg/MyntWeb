import { Typography } from '@mui/material';
import { useAuth } from '../auth/useAuth';
import { ContentBox } from '../theme/styled';
import TotalSummary from '../components/TotalSummary';
import { useAssetsSummary } from '../hooks/useAssets';

const Dashboard = () => {
  const { userEmail } = useAuth();
  const { data: summary, isLoading } = useAssetsSummary();

  return (
    <>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Welcome to Mynt Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hello, {userEmail}!
        </Typography>
      </ContentBox>

      {/* Total Summary Section */}
      <ContentBox sx={{ mt: 3 }}>
        {summary && !isLoading && (
          <TotalSummary summary={summary} />
        )}
      </ContentBox>

      {/* Quick Actions */}
      <ContentBox sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the navigation menu to manage your assets, view analytics, and adjust settings.
        </Typography>
      </ContentBox>
    </>
  );
};

export default Dashboard; 