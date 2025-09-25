import React from 'react';
import { List } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { getNavigationItems } from './sidebar.utils';

const SidebarNavigation = ({ user, onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = getNavigationItems(user.role);

  const handleNavigation = (path) => {
    navigate(path);
    onItemClick();
  };

  return (
    <List>
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.path}
          item={item}
          isActive={location.pathname === item.path}
          onClick={() => handleNavigation(item.path)}
        />
      ))}
    </List>
  );
};

export default SidebarNavigation;
