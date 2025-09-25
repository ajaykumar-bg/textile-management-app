import React from 'react';
import { Drawer, Box } from '@mui/material';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import { useUser } from '../../context/UserContext';

const Sidebar = ({ open, onClose }) => {
  const { user } = useUser();

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
        <SidebarHeader user={user} />
        <SidebarNavigation user={user} onItemClick={onClose} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
