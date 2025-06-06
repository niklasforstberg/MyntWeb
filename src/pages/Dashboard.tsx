import { Box, Typography, Container } from '@mui/material';
import { useAuth } from '../auth/useAuth';

const Dashboard = () => {
  const { userEmail } = useAuth();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Mynt Dashboard
        </Typography>
        <Typography variant="body1">
          Hello, {userEmail}!
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard; 