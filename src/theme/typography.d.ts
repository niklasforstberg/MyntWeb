import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    number1: React.CSSProperties;
    number2: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    number1?: React.CSSProperties;
    number2?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    number1: true;
    number2: true;
  }
} 