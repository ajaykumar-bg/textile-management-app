import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { useUser } from '../../context/UserContext';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import CustomerDashboard from './CustomerDashboard';

const Dashboard = () => {
  const { user, permissions } = useUser();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' gutterBottom>
          Dashboard
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Welcome back, {user.name}! Here's what's happening with your{' '}
          {user.role === 'customer' ? 'orders' : 'textile management'}.
        </Typography>
      </Box>

      {/* Role-based Dashboard Content */}
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'staff' && <StaffDashboard />}
      {user.role === 'customer' && <CustomerDashboard />}

      {/* No permissions fallback */}
      {!permissions.canViewAnalytics && user.role !== 'customer' && (
        <Alert severity='info' sx={{ mt: 3 }}>
          Limited dashboard view. Contact your administrator for more access.
        </Alert>
      )}
    </Box>
  );
};

export default Dashboard;
