import { Box, Typography } from '@mui/material';
import AccountItem from './AccountItem';

interface Account {
  id: number;
  name: string;
  description?: string;
  currentValue?: number;
  assetTypeId?: number;
  financialGroupId?: number;
}

interface AccountListProps {
  accounts: Account[];
  onEditAccount: (id: number, updatedData: Partial<Account>) => void;
  onDeleteAccount: (id: number) => void;
}

const AccountList = ({ accounts, onEditAccount, onDeleteAccount }: AccountListProps) => {
  if (accounts.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        No assets found. Add your first asset to get started.
      </Typography>
    );
  }

  return (
    <Box sx={{ 
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden'
    }}>
      {accounts.map((account) => (
        <AccountItem 
          key={account.id} 
          account={account}
          onEdit={(updatedData) => onEditAccount(account.id, updatedData)}
          onDelete={() => onDeleteAccount(account.id)}
        />
      ))}
    </Box>
  );
};

export default AccountList; 