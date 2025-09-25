import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  Inventory as InventoryIcon,
  ShoppingCart as SalesIcon,
  LocalShipping as PurchaseIcon,
  Factory as ProductionIcon,
  Palette as DesignIcon,
  AccountBalance as AccountingIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  ];

  // Add business module navigation items based on role
  if (user.role === 'admin' || user.role === 'staff') {
    navigationItems.push(
      { label: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
      { label: 'Sales', path: '/sales', icon: <SalesIcon /> },
      { label: 'Purchase', path: '/purchase', icon: <PurchaseIcon /> },
      { label: 'Production', path: '/production', icon: <ProductionIcon /> },
      { label: 'Design', path: '/design', icon: <DesignIcon /> }
    );
  }

  // Add customer-specific navigation
  if (user.role === 'customer') {
    navigationItems.push(
      { label: 'Products', path: '/inventory', icon: <InventoryIcon /> },
      { label: 'Orders', path: '/sales', icon: <SalesIcon /> }
    );
  }

  // Add admin-only navigation items
  if (user.role === 'admin') {
    navigationItems.push(
      { label: 'Accounting', path: '/accounting', icon: <AccountingIcon /> },
      {
        label: 'Role Configuration',
        path: '/role-configuration',
        icon: <TuneIcon />,
      }
    );
  }

  // Add Settings for all users
  navigationItems.push({
    label: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
  });

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    onClose();
  };

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Navigation
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'primary.main'
                        : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight:
                        location.pathname === item.path ? 'bold' : 'normal',
                      color:
                        location.pathname === item.path
                          ? 'primary.main'
                          : 'inherit',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
