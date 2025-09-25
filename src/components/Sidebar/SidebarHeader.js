import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const SidebarHeader = ({ user }) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Navigation
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default SidebarHeader;
