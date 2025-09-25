import React from 'react';
import { Box, Typography } from '@mui/material';
import { useUser } from '../../context/UserContext';

const DashboardHeader = () => {
  const { user } = useUser();

  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'admin':
        return "Here's what's happening with your textile management system.";
      case 'staff':
        return "Here's what's happening with your textile operations.";
      case 'customer':
        return "Here's what's happening with your orders.";
      default:
        return "Here's your dashboard overview.";
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Welcome back, {user.name}! {getWelcomeMessage()}
      </Typography>
    </Box>
  );
};

export default DashboardHeader;
