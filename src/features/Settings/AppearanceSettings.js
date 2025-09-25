import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
} from '@mui/material';
import { Palette } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';
import ThemeOptionCard from './ThemeOptionCard';
import { themeOptions } from './settings.constants';

const AppearanceSettings = () => {
  const { mode, setThemeMode } = useThemeMode();

  const handleThemeChange = (event) => {
    setThemeMode(event.target.value);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography
        variant='h5'
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Palette />
        Appearance
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        Choose your preferred theme to personalize your experience
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <FormControl component='fieldset'>
        <FormLabel component='legend' sx={{ mb: 2, fontWeight: 500 }}>
          Theme Mode
        </FormLabel>
        <RadioGroup
          value={mode}
          onChange={handleThemeChange}
          name='theme-selection'
        >
          <Grid container spacing={2}>
            {themeOptions.map((option) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={option.value}>
                <ThemeOptionCard
                  option={option}
                  isSelected={mode === option.value}
                  onSelect={() => setThemeMode(option.value)}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default AppearanceSettings;
