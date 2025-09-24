import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { LightMode, DarkMode, Palette } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const Settings = () => {
  const { mode, setThemeMode } = useThemeMode();

  const handleThemeChange = (event) => {
    setThemeMode(event.target.value);
  };

  const themeOptions = [
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h2' gutterBottom>
        Settings
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Customize your application experience
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
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
            Skin Mode
          </FormLabel>
          <RadioGroup
            value={mode}
            onChange={handleThemeChange}
            name='theme-selection'
          >
            <Grid container spacing={2}>
              {themeOptions.map((option) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={option.value}>
                  <Card
                    variant='outlined'
                    sx={{
                      cursor: 'pointer',
                      border: mode === option.value ? 2 : 1,
                      borderColor:
                        mode === option.value ? 'primary.main' : 'divider',
                      bgcolor:
                        mode === option.value
                          ? 'action.selected'
                          : 'background.paper',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                    }}
                    onClick={() => setThemeMode(option.value)}
                  >
                    <CardContent>
                      <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        label=''
                        sx={{ m: 0, width: '100%' }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mt: 1,
                        }}
                      >
                        {option.icon}
                        <Box>
                          <Typography variant='h6' component='div'>
                            {option.label}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Paper>

      {/* Preview Section */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant='h5' gutterBottom>
          Preview
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Current theme:{' '}
          <strong>{themeOptions.find((t) => t.value === mode)?.label}</strong>
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
    </Box>
  );
};

export default Settings;
