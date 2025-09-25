import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import AppearanceSettings from './AppearanceSettings';
import ThemePreview from './ThemePreview';

const Settings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h2' gutterBottom>
        Settings
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Customize your application experience
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppearanceSettings />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ThemePreview />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
