import React from 'react';
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

// Base navigation items available to all users
const BASE_NAVIGATION_ITEMS = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
];

// Business module navigation items for admin and staff
const BUSINESS_MODULE_ITEMS = [
  { label: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
  { label: 'Sales', path: '/sales', icon: <SalesIcon /> },
  { label: 'Purchase', path: '/purchase', icon: <PurchaseIcon /> },
  { label: 'Production', path: '/production', icon: <ProductionIcon /> },
  { label: 'Design', path: '/design', icon: <DesignIcon /> },
];

// Customer-specific navigation items
const CUSTOMER_NAVIGATION_ITEMS = [
  { label: 'Products', path: '/inventory', icon: <InventoryIcon /> },
  { label: 'Orders', path: '/sales', icon: <SalesIcon /> },
];

// Admin-only navigation items
const ADMIN_ONLY_ITEMS = [
  { label: 'Accounting', path: '/accounting', icon: <AccountingIcon /> },
  {
    label: 'Role Configuration',
    path: '/role-configuration',
    icon: <TuneIcon />,
  },
];

// Settings available to all users
const SETTINGS_ITEM = {
  label: 'Settings',
  path: '/settings',
  icon: <SettingsIcon />,
};

/**
 * Generate navigation items based on user role
 * @param {string} role - User role (admin, staff, customer)
 * @returns {Array} Array of navigation items
 */
export const getNavigationItems = (role) => {
  let roleSpecificItems = [];

  // Add role-specific navigation items
  switch (role) {
    case 'admin':
      roleSpecificItems = [...BUSINESS_MODULE_ITEMS, ...ADMIN_ONLY_ITEMS];
      break;

    case 'staff':
      roleSpecificItems = [...BUSINESS_MODULE_ITEMS];
      break;

    case 'customer':
      roleSpecificItems = [...CUSTOMER_NAVIGATION_ITEMS];
      break;

    default:
      // Default case for unknown roles
      roleSpecificItems = [];
      break;
  }

  // Return new array with all items using spread operator
  return [...BASE_NAVIGATION_ITEMS, ...roleSpecificItems, SETTINGS_ITEM];
};
