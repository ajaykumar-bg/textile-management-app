import React, { useState } from 'react';
import { Tooltip, Button, Avatar, Box, Typography } from '@mui/material';
import { useUser } from '../../context/UserContext';
import UserMenuDropdown from './UserMenuDropdown';
import { getUserInitials } from './navbar.utils';

const UserMenu = () => {
  const { user } = useUser();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <>
      <Tooltip title='User Menu'>
        <Button
          color='inherit'
          onClick={handleUserMenuClick}
          sx={{
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            ml: 1,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.dark',
              fontSize: '0.875rem',
            }}
          >
            {getUserInitials(user.name)}
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {user.name}
            </Typography>
            <Typography variant='caption' sx={{ opacity: 0.8 }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Typography>
          </Box>
        </Button>
      </Tooltip>

      <UserMenuDropdown
        anchorEl={userMenuAnchorEl}
        open={Boolean(userMenuAnchorEl)}
        onClose={handleUserMenuClose}
        user={user}
      />
    </>
  );
};

export default UserMenu;
