import { Typography, Grid, Paper } from '@mui/material';
import { ContentBox, StatsCard } from '../theme/styled';

const Analytics = () => {
  return (
    <>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Track your financial performance and insights
        </Typography>
      </ContentBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatsCard>
            <Typography variant="h6" gutterBottom>
              Portfolio Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coming soon...
            </Typography>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StatsCard>
            <Typography variant="h6" gutterBottom>
              Asset Allocation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coming soon...
            </Typography>
          </StatsCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Analytics; 