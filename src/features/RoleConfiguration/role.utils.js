/**
 * Role configuration utility functions
 */

export const getRoleIcon = (role) => {
  const iconMap = {
    admin: 'AdminPanelSettings',
    staff: 'Support',
    customer: 'StorefrontOutlined',
  };
  return iconMap[role] || 'StorefrontOutlined';
};

export const getRoleColor = (role) => {
  const colorMap = {
    admin: 'error',
    staff: 'warning',
    customer: 'primary',
  };
  return colorMap[role] || 'primary';
};

export const getRoleDisplayName = (role) => {
  return role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Unknown';
};

export const isAdminOnlyPermission = (permission, adminOnlyPermissions) => {
  return adminOnlyPermissions.includes(permission);
};

export const getPermissionLevel = (permission, role, adminOnlyPermissions) => {
  switch (role) {
    case 'admin':
      return 'full';
    case 'staff':
      return isAdminOnlyPermission(permission, adminOnlyPermissions)
        ? 'none'
        : 'full';
    case 'customer':
      if (permission === 'canViewDashboard') return 'full';
      if (['canManageInventory', 'canManageSales'].includes(permission))
        return 'view';
      return 'none';
    default:
      return 'none';
  }
};

export const formatPermissionLabel = (permissionKey) => {
  // Convert camelCase to readable format
  return permissionKey
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};
