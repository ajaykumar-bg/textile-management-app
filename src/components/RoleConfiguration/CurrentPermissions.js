import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import { useUser } from '../../context/UserContext';
import { permissionLabels } from './role.constants';

const CurrentPermissions = () => {
  const { user, permissions } = useUser();

  return (
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
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: value ? 'success.lighter' : 'error.lighter',
                  borderLeft: `4px solid ${value ? '#4caf50' : '#f44336'}`,
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
  );
};

export default CurrentPermissions;
