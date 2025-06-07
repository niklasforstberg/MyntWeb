import { styled } from '@mui/material/styles';
import { Box, Paper, Container } from '@mui/material';
import { spacing } from './index';

// Common layout components
export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  minHeight: '100vh',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(6),
  },
}));

// Card variations
export const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
}));

export const OverviewCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

// Utility components for spacing
export const Spacer = styled(Box)<{ size?: keyof typeof spacing }>(({ size = 'md' }) => ({
  height: spacing[size],
  width: '100%',
}));

export const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const FlexCenter = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const FlexColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

// Responsive grid helpers
export const ResponsiveGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(4),
  },
})); 