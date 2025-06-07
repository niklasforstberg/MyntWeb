import { AppBar, Toolbar, Box } from '@mui/material';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Layout: React.FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* ... existing toolbar items ... */}
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      {/* ... rest of layout */}
    </Box>
  );
}; 