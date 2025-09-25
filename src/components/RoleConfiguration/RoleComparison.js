import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Chip,
} from '@mui/material';
import { permissionLabels, adminOnlyPermissions } from './role.constants';
import RoleComparisonInfo from './RoleComparisonInfo';

const RoleComparison = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('permission');

  const handleRequestSort = () => {
    const isAsc = orderBy === 'permission' && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy('permission');
  };

  const createSortHandler = () => (event) => {
    handleRequestSort();
  };

  const sortedPermissions = useMemo(() => {
    const permissionKeys = Object.keys(permissionLabels);

    return [...permissionKeys].sort((a, b) => {
      const aValue = permissionLabels[a].toLowerCase();
      const bValue = permissionLabels[b].toLowerCase();

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [order]);
  const getPermissionForRole = (key, role) => {
    switch (role) {
      case 'admin':
        return { hasPermission: true, level: 'full' };
      case 'staff':
        return {
          hasPermission: !adminOnlyPermissions.includes(key),
          level: 'full',
        };
      case 'customer':
        const hasPermission = key === 'canViewDashboard';
        const isViewOnly = ['canManageInventory', 'canManageSales'].includes(
          key
        );
        return {
          hasPermission: hasPermission || isViewOnly,
          level: hasPermission ? 'full' : isViewOnly ? 'view' : 'none',
        };
      default:
        return { hasPermission: false, level: 'none' };
    }
  };

  const getChipProps = (permission) => {
    switch (permission.level) {
      case 'full':
        return { label: '✓', color: 'success' };
      case 'view':
        return { label: '◐', color: 'warning' };
      default:
        return { label: '✗', color: 'error' };
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Comparison
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Compare module access permissions between admin, staff, and customer
          roles
        </Typography>

        <RoleComparisonInfo />

        <TableContainer component={Paper} elevation={0}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  <TableSortLabel
                    active={orderBy === 'permission'}
                    direction={orderBy === 'permission' ? order : 'asc'}
                    onClick={createSortHandler()}
                  >
                    Permission
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                  Admin
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                  Staff
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                  Customer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPermissions.map((key) => {
                const adminPermission = getPermissionForRole(key, 'admin');
                const staffPermission = getPermissionForRole(key, 'staff');
                const customerPermission = getPermissionForRole(
                  key,
                  'customer'
                );

                return (
                  <TableRow key={key} hover>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {permissionLabels[key]}
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        {...getChipProps(adminPermission)}
                        size='small'
                        variant='filled'
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        {...getChipProps(staffPermission)}
                        size='small'
                        variant='filled'
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        {...getChipProps(customerPermission)}
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
  );
};

export default RoleComparison;
