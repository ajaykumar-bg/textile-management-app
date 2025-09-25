import React from 'react';
import { Box } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import DashboardPermissionAlert from './DashboardPermissionAlert';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <DashboardHeader />
      <DashboardContent />
      <DashboardPermissionAlert />
    </Box>
  );
};

export default Dashboard;
