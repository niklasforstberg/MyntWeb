import { Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Switch, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { Settings as SettingsIcon, Notifications as NotificationsIcon, Security as SecurityIcon, CurrencyExchange as CurrencyIcon } from '@mui/icons-material';
import { ContentBox } from '../theme/styled';
import { useUserSettings } from '../hooks/useUserSettings';
import { useCurrencies, type Currency } from '../hooks/useCurrencies';

const Settings = () => {
  const { data: settings, isLoading: loadingSettings, updateSettings, isUpdating, updateError } = useUserSettings();
  const { data: currencies = [], isLoading: loadingCurrencies } = useCurrencies();

  const handleCurrencyChange = (currencyCode: string) => {
    updateSettings({ preferredCurrency: currencyCode });
  };

  return (
    <>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your account preferences
        </Typography>
      </ContentBox>

      {updateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to update settings. Please try again.
        </Alert>
      )}

      <Paper sx={{ maxWidth: 600 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CurrencyIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Preferred Currency" 
              secondary="Currency used for summaries and totals"
            />
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={settings?.preferredCurrency || ''}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                disabled={loadingSettings || loadingCurrencies || isUpdating}
                size="small"
              >
                <MenuItem value="">
                  <em>Select currency</em>
                </MenuItem>
                {currencies.map((currency: Currency) => (
                  <MenuItem key={currency.id} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive updates about your portfolio"
            />
            <Switch />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Two-Factor Authentication" 
              secondary="Add an extra layer of security"
            />
            <Switch />
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

export default Settings; 