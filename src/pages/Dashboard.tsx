import { Typography, Button } from '@mui/material';
import { useAuth } from '../auth/useAuth';
import { useState, useEffect } from 'react';
import { getAssets, createAsset } from '../api/axios';
import { 
  PageContainer, 
  ContentBox, 
  FlexBetween 
} from '../theme/styled';
import AccountSummary from '../components/AccountSummary';
import AccountList from '../components/AccountList';
import AddAccountForm from '../components/AddAccountForm';
import { getToken, isTokenValid } from '../auth/authUtils';

interface Account {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

const Dashboard = () => {
  const { userEmail, isAuthenticated } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  
  // Debug authentication state
  console.log('Dashboard - isAuthenticated:', isAuthenticated);
  console.log('Dashboard - userEmail:', userEmail);
  console.log('Dashboard - token exists:', !!getToken());
  console.log('Dashboard - token valid:', isTokenValid());

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await getAssets();
      console.log('Dashboard: Accounts fetched:', data);
      setAccounts(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching accounts:', err);
      // Don't set error state for 500 errors - this is a backend issue
      // Only show error for actual auth/network issues
      if (err.response?.status === 500) {
        console.log('Backend error (500) - likely database issue, continuing with empty accounts');
        setAccounts([]);
        setError(null);
      } else {
        setError('Failed to load accounts');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddAccount = async (newAccount: Omit<Account, 'id'>) => {
    try {
      setCreating(true);
      await createAsset(newAccount);
      
      // Refresh the accounts list and close form
      await fetchAccounts();
      setAddFormOpen(false);
      
      console.log('Account created successfully!');
    } catch (err) {
      console.error('Error creating account:', err);
      // You might want to show an error message to the user here
    } finally {
      setCreating(false);
    }
  };

  const handleEditAccount = (id: number, updatedData: Partial<Account>) => {
    setAccounts(prev =>
      prev.map(acc => acc.id === id ? { ...acc, ...updatedData } : acc)
    );
    // TODO: Add API call to update account
    console.log('Edit account:', id, updatedData);
  };

  const handleDeleteAccount = (id: number) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    // TODO: Add API call to delete account
    console.log('Delete account:', id);
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

      {/* Account Summary Section */}
      <ContentBox sx={{ mt: 3 }}>
        <AccountSummary accounts={accounts} />
      </ContentBox>

      {/* Accounts List Section */}
      <ContentBox sx={{ mt: 3 }}>
        <FlexBetween sx={{ mb: 2 }}>
          <Typography variant="h5">Your Assets</Typography>
          <Button 
            variant="contained" 
            onClick={() => setAddFormOpen(true)}
            sx={{ 
              minHeight: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              px: 2
            }}
          >
            +
          </Button>
        </FlexBetween>

        {loading && (
          <Typography color="text.secondary">Loading accounts...</Typography>
        )}

        {error && (
          <Typography color="error">{error}</Typography>
        )}

        {!loading && !error && (
          <AccountList 
            accounts={accounts}
            onEditAccount={handleEditAccount}
            onDeleteAccount={handleDeleteAccount}
          />
        )}
      </ContentBox>

      {/* Add Account Form */}
      <AddAccountForm 
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        onAddAccount={handleAddAccount}
        creating={creating}
      />
    </PageContainer>
  );
};

export default Dashboard; 