import React from 'react';
import { LightMode, DarkMode, Palette } from '@mui/icons-material';

export const themeOptions = [
  {
    value: 'light',
    label: 'Light',
    description: 'Clean and bright interface',
    icon: <LightMode sx={{ color: '#FFA726' }} />,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes, perfect for low-light environments',
    icon: <DarkMode sx={{ color: '#64B5F6' }} />,
  },
  {
    value: 'pink',
    label: 'Pink',
    description: 'Vibrant and modern with custom pink accent',
    icon: <Palette sx={{ color: '#E60386' }} />,
  },
];
