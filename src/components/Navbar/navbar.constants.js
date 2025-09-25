import React from 'react';
import {
  AdminPanelSettings,
  Support,
  StorefrontOutlined,
} from '@mui/icons-material';

// Role configuration with icons and labels
export const ROLE_CONFIG = {
  admin: {
    label: 'Switch to Admin',
    icon: <AdminPanelSettings fontSize='small' />,
  },
  staff: {
    label: 'Switch to Staff',
    icon: <Support fontSize='small' />,
  },
  customer: {
    label: 'Switch to Customer',
    icon: <StorefrontOutlined fontSize='small' />,
  },
};
