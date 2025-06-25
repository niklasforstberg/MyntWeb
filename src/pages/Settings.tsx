import { Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Switch } from '@mui/material';
import { Settings as SettingsIcon, Notifications as NotificationsIcon, Security as SecurityIcon } from '@mui/icons-material';
import { ContentBox } from '../theme/styled';

const Settings = () => {
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

      <Paper sx={{ maxWidth: 600 }}>
        <List>
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