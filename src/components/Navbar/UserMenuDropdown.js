import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Logout, AccountCircle } from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import { ROLE_CONFIG } from './navbar.constants';

const UserMenuDropdown = ({ anchorEl, open, onClose, user }) => {
  const { switchRole } = useUser();

  const handleRoleChange = (role) => {
    switchRole(role);
    onClose();
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect to login
    console.log('Logout clicked');
    onClose();
    // You can add actual logout logic here
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { minWidth: 220 },
      }}
    >
      {/* User Info */}
      <MenuItem disabled>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {user.name}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {user.email}
          </Typography>
        </ListItemText>
      </MenuItem>
      <Divider />

      {/* Role Switcher */}
      {Object.entries(ROLE_CONFIG).map(([roleKey, config]) => (
        <MenuItem
          key={roleKey}
          onClick={() => handleRoleChange(roleKey)}
          disabled={user.role === roleKey}
        >
          <ListItemIcon>{config.icon}</ListItemIcon>
          <ListItemText>{config.label}</ListItemText>
        </MenuItem>
      ))}

      <Divider />

      {/* Logout */}
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default UserMenuDropdown;
