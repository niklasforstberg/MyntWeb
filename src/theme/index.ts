import { createTheme, type ThemeOptions } from '@mui/material/styles';

// Design tokens from your technical docs
const colors = {
  primary: '#1EB980',
  secondary: '#045D56',
  accent: {
    red: '#FF6859',
    yellow: '#FFCF44',
    purple: '#B15DFF',
    blue: '#72DEFF',
  },
};

// Spacing system (8px base unit is MUI default)
const spacing = {
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  xxl: 48, // 48px
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#ffffff',
    },
    error: {
      main: colors.accent.red,
    },
    warning: {
      main: colors.accent.yellow,
    },
    info: {
      main: colors.accent.blue,
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    // Lato for all text content (headings, body, etc.)
    h1: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
    },
    // Lato for body text
    body1: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
    },
    caption: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
    },
    // Custom variants for numbers - Eczar
    number1: {
      fontFamily: 'Eczar, serif',
      fontWeight: 600,
      fontSize: '2rem',
    },
    number2: {
      fontFamily: 'Eczar, serif',
      fontWeight: 500,
      fontSize: '1.5rem',
    },
  },
  spacing: 8, // Base spacing unit
  shape: {
    borderRadius: 8,
  },
  components: {
    // Global component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
          '@media (min-width: 600px)': {
            paddingLeft: spacing.lg,
            paddingRight: spacing.lg,
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

// Export design tokens for use in styled components
export { colors, spacing };

// Breakpoints for responsive design
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}; 