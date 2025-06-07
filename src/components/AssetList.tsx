import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Card, CardContent } from '@mui/material';

export const AssetList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t('assets.title')}
        </Typography>
        <Button variant="contained" color="primary">
          {t('assets.createNew')}
        </Button>
        {/* ... rest of component */}
      </CardContent>
    </Card>
  );
}; 