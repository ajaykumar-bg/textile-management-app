import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Support as StaffIcon,
  StorefrontOutlined as CustomerIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';

const Configuration = () => {
  const { user, permissions, switchRole } = useUser();

  const permissionLabels = {
    canViewAllReports: 'View All Reports',
    canManageUsers: 'Manage Users',
    canManageInventory: 'Manage Inventory',
    canViewAnalytics: 'View Analytics',
    canManageOrders: 'Manage Orders',
    canAccessConfiguration: 'Access Configuration',
    canViewFinancials: 'View Financials',
  };

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Configuration
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Manage role-based authentication and permissions for admin, staff, and
        customer users
      </Typography>

      <Grid container spacing={3}>
        {/* User Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Current User
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  Name
                </Typography>
                <Typography variant='body1'>{user.name}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  Email
                </Typography>
                <Typography variant='body1'>{user.email}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  Role
                </Typography>
                <Chip
                  icon={
                    user.role === 'admin' ? (
                      <AdminIcon />
                    ) : user.role === 'staff' ? (
                      <StaffIcon />
                    ) : (
                      <CustomerIcon />
                    )
                  }
                  label={user.role.toUpperCase()}
                  color={
                    user.role === 'admin'
                      ? 'error'
                      : user.role === 'staff'
                      ? 'warning'
                      : 'primary'
                  }
                  variant='filled'
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Role Switching */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Management
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Switch between roles to test different permission levels - Admin
                (full access), Staff (operational access), Customer (order
                management)
              </Typography>

              <Stack direction='row' spacing={2} flexWrap='wrap'>
                <Button
                  variant={user.role === 'admin' ? 'contained' : 'outlined'}
                  color='error'
                  startIcon={<AdminIcon />}
                  onClick={() => handleRoleSwitch('admin')}
                  disabled={user.role === 'admin'}
                >
                  Admin
                </Button>
                <Button
                  variant={user.role === 'staff' ? 'contained' : 'outlined'}
                  color='warning'
                  startIcon={<StaffIcon />}
                  onClick={() => handleRoleSwitch('staff')}
                  disabled={user.role === 'staff'}
                  sx={{ mt: { xs: 1, sm: 0 } }}
                >
                  Staff
                </Button>
                <Button
                  variant={user.role === 'customer' ? 'contained' : 'outlined'}
                  color='primary'
                  startIcon={<CustomerIcon />}
                  onClick={() => handleRoleSwitch('customer')}
                  disabled={user.role === 'customer'}
                  sx={{ mt: { xs: 1, sm: 0 } }}
                >
                  Customer
                </Button>
              </Stack>

              <Alert severity='info' sx={{ mt: 2 }}>
                Role changes take effect immediately and will update the
                dashboard visibility.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Permissions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Current Permissions ({user.role.toUpperCase()})
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Dashboard sections visible to the current role
              </Typography>

              <Grid container spacing={2}>
                {Object.entries(permissions).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: value
                          ? 'success.lighter'
                          : 'error.lighter',
                        borderLeft: `4px solid ${
                          value ? '#4caf50' : '#f44336'
                        }`,
                      }}
                    >
                      <Typography variant='body2'>
                        {permissionLabels[key] || key}
                      </Typography>
                      <Chip
                        label={value ? 'Enabled' : 'Disabled'}
                        color={value ? 'success' : 'error'}
                        size='small'
                        variant='outlined'
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Permission Comparison */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Comparison
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Compare permissions between admin, staff, and customer roles
              </Typography>

              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 600,
                        }}
                      >
                        Permission
                      </th>
                      <th
                        style={{
                          textAlign: 'center',
                          padding: '12px 8px',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 600,
                          color: '#d32f2f',
                        }}
                      >
                        Admin
                      </th>
                      <th
                        style={{
                          textAlign: 'center',
                          padding: '12px 8px',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 600,
                          color: '#ed6c02',
                        }}
                      >
                        Staff
                      </th>
                      <th
                        style={{
                          textAlign: 'center',
                          padding: '12px 8px',
                          borderBottom: '2px solid #ddd',
                          fontWeight: 600,
                          color: '#1976d2',
                        }}
                      >
                        Customer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(permissionLabels).map((key) => {
                      const staffHasPermission = ![
                        'canViewAllReports',
                        'canManageUsers',
                        'canAccessConfiguration',
                        'canViewFinancials',
                      ].includes(key);

                      const customerHasPermission = key === 'canManageOrders';

                      return (
                        <tr key={key}>
                          <td
                            style={{
                              padding: '12px 8px',
                              borderBottom: '1px solid #eee',
                              fontWeight: 500,
                            }}
                          >
                            {permissionLabels[key]}
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              padding: '12px 8px',
                              borderBottom: '1px solid #eee',
                            }}
                          >
                            <Chip
                              label='✓'
                              color='success'
                              size='small'
                              variant='filled'
                            />
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              padding: '12px 8px',
                              borderBottom: '1px solid #eee',
                            }}
                          >
                            <Chip
                              label={staffHasPermission ? '✓' : '✗'}
                              color={staffHasPermission ? 'success' : 'error'}
                              size='small'
                              variant='filled'
                            />
                          </td>
                          <td
                            style={{
                              textAlign: 'center',
                              padding: '12px 8px',
                              borderBottom: '1px solid #eee',
                            }}
                          >
                            <Chip
                              label={customerHasPermission ? '✓' : '✗'}
                              color={
                                customerHasPermission ? 'success' : 'error'
                              }
                              size='small'
                              variant='filled'
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Configuration;
