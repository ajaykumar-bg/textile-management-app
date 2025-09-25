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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Support as StaffIcon,
  StorefrontOutlined as CustomerIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';

const RoleConfiguration = () => {
  const { user, permissions, switchRole } = useUser();

  const permissionLabels = {
    canViewDashboard: 'View Dashboard',
    canManageInventory: 'Manage Inventory',
    canManageSales: 'Manage Sales',
    canManagePurchase: 'Manage Purchase',
    canManageProduction: 'Manage Production',
    canManageDesign: 'Manage Design',
    canManageAccounting: 'Manage Accounting',
    canAccessRoleConfiguration: 'Access Role Configuration',
    canManageUsers: 'Manage Users',
    canViewAllReports: 'View All Reports',
    canViewAnalytics: 'View Analytics',
    canViewFinancials: 'View Financials',
  };

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
  };

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
        {/* User Information */}
        <Grid size={{ xs: 12, md: 6 }}>
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Management
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Switch between roles to test different permission levels:
                <br />• <strong>Admin:</strong> Full access to all modules
                including financial management
                <br />• <strong>Staff:</strong> Operational access to inventory,
                sales, purchase, production, and design
                <br />• <strong>Customer:</strong> Can view products and manage
                their own orders
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
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Current Permissions ({user.role.toUpperCase()})
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Business module permissions for the current role
              </Typography>

              <Grid container spacing={2}>
                {Object.entries(permissions).map(([key, value]) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
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
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Comparison
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Compare module access permissions between admin, staff, and
                customer roles
              </Typography>

              <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant='caption' color='text.secondary'>
                  <strong>Legend:</strong> ✓ = Full Access • ◐ = View Only • ✗ =
                  No Access
                </Typography>
              </Box>

              <TableContainer component={Paper} elevation={0}>
                <Table dense>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        Permission
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        Admin
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        Staff
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        Customer
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(permissionLabels).map((key) => {
                      // Staff permissions: can access business modules but not admin-only features
                      const staffHasPermission = ![
                        'canManageAccounting',
                        'canAccessRoleConfiguration',
                        'canManageUsers',
                        'canViewAllReports',
                        'canViewFinancials',
                      ].includes(key);

                      // Customer permissions: only dashboard access and order management (limited)
                      const customerHasPermission = key === 'canViewDashboard';

                      return (
                        <TableRow key={key} hover>
                          <TableCell
                            sx={{
                              fontWeight: 500,
                            }}
                          >
                            {permissionLabels[key]}
                          </TableCell>
                          <TableCell align='center'>
                            <Chip
                              label='✓'
                              color='success'
                              size='small'
                              variant='filled'
                            />
                          </TableCell>
                          <TableCell align='center'>
                            <Chip
                              label={staffHasPermission ? '✓' : '✗'}
                              color={staffHasPermission ? 'success' : 'error'}
                              size='small'
                              variant='filled'
                            />
                          </TableCell>
                          <TableCell align='center'>
                            <Chip
                              label={customerHasPermission ? '✓' : '◐'}
                              color={
                                customerHasPermission
                                  ? 'success'
                                  : [
                                      'canManageInventory',
                                      'canManageSales',
                                    ].includes(key)
                                  ? 'warning'
                                  : 'error'
                              }
                              size='small'
                              variant='filled'
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Role Details */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Role Access Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'error.lighter',
                      borderLeft: '4px solid',
                      borderColor: 'error.main',
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      fontWeight='bold'
                      color='error.dark'
                      gutterBottom
                    >
                      Admin Access
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      • Full system access
                      <br />
                      • All business modules
                      <br />
                      • Financial management
                      <br />
                      • User & role management
                      <br />• System configuration
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'warning.lighter',
                      borderLeft: '4px solid',
                      borderColor: 'warning.main',
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      fontWeight='bold'
                      color='warning.dark'
                      gutterBottom
                    >
                      Staff Access
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      • Operational modules
                      <br />
                      • Inventory management
                      <br />
                      • Sales & purchase
                      <br />
                      • Production & design
                      <br />• Analytics (limited)
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'primary.lighter',
                      borderLeft: '4px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      fontWeight='bold'
                      color='primary.dark'
                      gutterBottom
                    >
                      Customer Access
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      • View products (inventory)
                      <br />
                      • Manage own orders
                      <br />
                      • Order history
                      <br />
                      • Basic dashboard
                      <br />• Limited to self-service
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoleConfiguration;
