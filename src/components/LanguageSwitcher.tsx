import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label="change language"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={i18n.language === lang.code}
          >
            <ListItemIcon>
              <span style={{ fontSize: '1.2em' }}>{lang.flag}</span>
            </ListItemIcon>
            <ListItemText primary={lang.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}; 