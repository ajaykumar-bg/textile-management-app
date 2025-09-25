import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const NavigationItem = ({ item, isActive, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick} selected={isActive}>
        <ListItemIcon
          sx={{
            color: isActive ? 'primary.main' : 'inherit',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{
            '& .MuiListItemText-primary': {
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? 'primary.main' : 'inherit',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavigationItem;
