import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import UserInformation from './UserInformation';
import RoleManagement from './RoleManagement';
import CurrentPermissions from './CurrentPermissions';
import RoleComparison from './RoleComparison';
import RoleDetails from './RoleDetails';

const RoleConfiguration = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Role Configuration
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Manage role-based authentication and permissions for admin, staff, and
        customer users
      </Typography>

      <Grid container spacing={3}>
        {/* User Information and Role Management */}
        <Grid size={{ xs: 12, md: 6 }}>
          <UserInformation />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RoleManagement />
        </Grid>

        {/* Current Permissions */}
        <Grid size={{ xs: 12 }}>
          <CurrentPermissions />
        </Grid>

        {/* Permission Comparison */}
        <Grid size={{ xs: 12 }}>
          <RoleComparison />
        </Grid>

        {/* Role Details */}
        <Grid size={{ xs: 12 }}>
          <RoleDetails />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoleConfiguration;
