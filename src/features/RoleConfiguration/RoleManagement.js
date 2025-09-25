import React from 'react';
import {
  Card,
  CardContent,
  Typography,
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
import { roleDescriptions } from './role.constants';

const RoleManagement = () => {
  const { user, switchRole } = useUser();

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Management
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Switch between roles to test different permission levels:
          {roleDescriptions.map((role) => (
            <React.Fragment key={role.name}>
              <br />• <strong>{role.name}:</strong> {role.description}
            </React.Fragment>
          ))}
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
          Role changes take effect immediately and will update the dashboard
          visibility.
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
