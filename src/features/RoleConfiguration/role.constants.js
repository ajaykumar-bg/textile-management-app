export const permissionLabels = {
  canViewDashboard: 'View Dashboard',
  canManageInventory: 'Manage Inventory',
  canManageSales: 'Manage Sales',
  canManagePurchase: 'Manage Purchase',
  canManageProduction: 'Manage Production',
  canManageDesign: 'Manage Design',
  canManageAccounting: 'Manage Accounting',
  canAccessRoleConfiguration: 'Access Role Configuration',
  canManageUsers: 'Manage Users',
  canViewAllReports: 'View All Reports',
  canViewAnalytics: 'View Analytics',
  canViewFinancials: 'View Financials',
};

export const adminOnlyPermissions = [
  'canManageAccounting',
  'canAccessRoleConfiguration',
  'canManageUsers',
  'canViewAllReports',
  'canViewFinancials',
];

export const roleDescriptions = [
  {
    name: 'Admin',
    description: 'Full access to all modules including financial management',
  },
  {
    name: 'Staff',
    description:
      'Operational access to inventory, sales, purchase, production, and design',
  },
  {
    name: 'Customer',
    description: 'Can view products and manage their own orders',
  },
];

export const roleAccessDetails = [
  {
    name: 'admin',
    title: 'Admin Access',
    bgColor: 'error.lighter',
    borderColor: 'error.main',
    textColor: 'error.dark',
    features: [
      'Full system access',
      'All business modules',
      'Financial management',
      'User & role management',
      'System configuration',
    ],
  },
  {
    name: 'staff',
    title: 'Staff Access',
    bgColor: 'warning.lighter',
    borderColor: 'warning.main',
    textColor: 'warning.dark',
    features: [
      'Operational modules',
      'Inventory management',
      'Sales & purchase',
      'Production & design',
      'Analytics (limited)',
    ],
  },
  {
    name: 'customer',
    title: 'Customer Access',
    bgColor: 'primary.lighter',
    borderColor: 'primary.main',
    textColor: 'primary.dark',
    features: [
      'View products (inventory)',
      'Manage own orders',
      'Order history',
      'Basic dashboard',
      'Limited to self-service',
    ],
  },
];
