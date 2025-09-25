import React from 'react';
import { Alert } from '@mui/material';
import { useUser } from '../../context/UserContext';

const DashboardPermissionAlert = () => {
  const { user, permissions } = useUser();

  // Only show alert for non-customer roles who don't have analytics permission
  if (user.role === 'customer' || permissions.canViewAnalytics) {
    return null;
  }

  return (
    <Alert severity='info' sx={{ mt: 3 }}>
      Limited dashboard view. Contact your administrator for more access.
    </Alert>
  );
};

export default DashboardPermissionAlert;
