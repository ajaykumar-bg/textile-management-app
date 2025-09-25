import React from 'react';
import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  Box,
  Typography,
} from '@mui/material';

const ThemeOptionCard = ({ option, isSelected, onSelect }) => {
  return (
    <Card
      variant='outlined'
      sx={{
        cursor: 'pointer',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        bgcolor: isSelected ? 'action.selected' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
          boxShadow: 2,
        },
      }}
      onClick={onSelect}
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
  );
};

export default ThemeOptionCard;
