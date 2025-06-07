import type { Theme } from '@mui/material/styles';
import { spacing, breakpoints } from './index';

// Spacing utilities
export const getSpacing = (size: keyof typeof spacing) => spacing[size];

// Common sx prop patterns
export const sx = {
  // Spacing patterns
  mt: (size: keyof typeof spacing) => ({ mt: spacing[size] / 8 }), // Convert to MUI units
  mb: (size: keyof typeof spacing) => ({ mb: spacing[size] / 8 }),
  ml: (size: keyof typeof spacing) => ({ ml: spacing[size] / 8 }),
  mr: (size: keyof typeof spacing) => ({ mr: spacing[size] / 8 }),
  mx: (size: keyof typeof spacing) => ({ mx: spacing[size] / 8 }),
  my: (size: keyof typeof spacing) => ({ my: spacing[size] / 8 }),
  p: (size: keyof typeof spacing) => ({ p: spacing[size] / 8 }),
  pt: (size: keyof typeof spacing) => ({ pt: spacing[size] / 8 }),
  pb: (size: keyof typeof spacing) => ({ pb: spacing[size] / 8 }),
  pl: (size: keyof typeof spacing) => ({ pl: spacing[size] / 8 }),
  pr: (size: keyof typeof spacing) => ({ pr: spacing[size] / 8 }),
  px: (size: keyof typeof spacing) => ({ px: spacing[size] / 8 }),
  py: (size: keyof typeof spacing) => ({ py: spacing[size] / 8 }),

  // Common flex patterns
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  // Common responsive patterns
  hideOnMobile: {
    display: { xs: 'none', sm: 'block' },
  },
  hideOnDesktop: {
    display: { xs: 'block', sm: 'none' },
  },
  responsiveText: {
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
  },
  responsivePadding: {
    p: { xs: 2, sm: 3, md: 4 },
  },

  // Common card patterns
  card: {
    p: 3,
    borderRadius: 2,
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
  },
  statsCard: {
    p: 3,
    borderRadius: 2,
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 8,
    },
  },
};

// Responsive utilities
export const responsive = {
  // Media query helpers
  up: (breakpoint: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[breakpoint]}px)`,
  down: (breakpoint: keyof typeof breakpoints) => `@media (max-width: ${breakpoints[breakpoint] - 1}px)`,
  between: (start: keyof typeof breakpoints, end: keyof typeof breakpoints) => 
    `@media (min-width: ${breakpoints[start]}px) and (max-width: ${breakpoints[end] - 1}px)`,

  // Common responsive values
  spacing: {
    xs: { xs: 1, sm: 2, md: 3 },
    sm: { xs: 2, sm: 3, md: 4 },
    md: { xs: 3, sm: 4, md: 6 },
    lg: { xs: 4, sm: 6, md: 8 },
  },
  
  typography: {
    h1: { xs: 'h3', sm: 'h2', md: 'h1' },
    h2: { xs: 'h4', sm: 'h3', md: 'h2' },
    h3: { xs: 'h5', sm: 'h4', md: 'h3' },
    h4: { xs: 'h6', sm: 'h5', md: 'h4' },
  },
};

// Animation utilities
export const animations = {
  fadeIn: {
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    animation: 'fadeIn 0.3s ease-in-out',
  },
  slideUp: {
    '@keyframes slideUp': {
      from: { transform: 'translateY(20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    animation: 'slideUp 0.4s ease-out',
  },
  bounce: {
    '@keyframes bounce': {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
      '40%, 43%': { transform: 'translate3d(0,-30px,0)' },
      '70%': { transform: 'translate3d(0,-15px,0)' },
      '90%': { transform: 'translate3d(0,-4px,0)' },
    },
    animation: 'bounce 1s ease',
  },
}; 