import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  AdminPanelSettings,
  Support,
  StorefrontOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { user, switchRole } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSidebarClose = () => {
    setDrawerOpen(false);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleRoleChange = (role) => {
    switchRole(role);
    handleUserMenuClose();
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect to login
    console.log('Logout clicked');
    handleUserMenuClose();
    // You can add actual logout logic here
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <>
      <AppBar position='static' sx={{ mb: 2, borderRadius: 0 }}>
        <Toolbar>
          {/* Menu Button */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer(true)}
            edge='start'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h2'
            component='div'
            sx={{ flexGrow: 1, fontSize: 18, fontWeight: 'bold' }}
          >
            Textile Management System
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* User Info Section */}
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
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: { minWidth: 220 },
              }}
            >
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
              <MenuItem
                onClick={() => handleRoleChange('admin')}
                disabled={user.role === 'admin'}
              >
                <ListItemIcon>
                  <AdminPanelSettings fontSize='small' />
                </ListItemIcon>
                <ListItemText>Switch to Admin</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => handleRoleChange('staff')}
                disabled={user.role === 'staff'}
              >
                <ListItemIcon>
                  <Support fontSize='small' />
                </ListItemIcon>
                <ListItemText>Switch to Staff</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => handleRoleChange('customer')}
                disabled={user.role === 'customer'}
              >
                <ListItemIcon>
                  <StorefrontOutlined fontSize='small' />
                </ListItemIcon>
                <ListItemText>Switch to Customer</ListItemText>
              </MenuItem>

              <Divider />

              {/* Logout */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>

            <Box
              component='img'
              src={`${process.env.PUBLIC_URL}/pepsico_logo.png`}
              alt='PepsiCo Logo'
              sx={{ height: 40, ml: 2 }}
              onError={(e) => {
                console.log('Logo failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Sidebar */}
      <Sidebar open={drawerOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default Navbar;
