import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';
import { themeOptions } from './settings.constants';

const ThemePreview = () => {
  const { mode } = useThemeMode();
  const currentTheme = themeOptions.find((t) => t.value === mode);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant='h5' gutterBottom>
        Preview
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Current theme: <strong>{currentTheme?.label}</strong>
      </Typography>
      <Box
        sx={{
          p: 3,
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Typography variant='h6' color='primary.main' gutterBottom>
          Sample Content
        </Typography>
        <Typography variant='body1' paragraph>
          This is how your content will look with the selected theme.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'secondary.main',
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'text.primary',
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ThemePreview;
