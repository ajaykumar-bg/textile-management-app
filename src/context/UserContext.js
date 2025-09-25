import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Mock user data - in real app this would come from authentication
  const [user, setUser] = useState({
    id: '1',
    name: 'Ajay Girija',
    email: 'ajay.girija@company.com',
    role: 'admin', // 'admin', 'staff', or 'customer'
  });

  // Define permissions based on role
  const permissions = {
    admin: {
      canViewDashboard: true,
      canManageInventory: true,
      canManageSales: true,
      canManagePurchase: true,
      canManageProduction: true,
      canManageDesign: true,
      canManageAccounting: true,
      canAccessRoleConfiguration: true,
      canManageUsers: true,
      canViewAllReports: true,
      canViewAnalytics: true,
      canViewFinancials: true,
    },
    staff: {
      canViewDashboard: true,
      canManageInventory: true,
      canManageSales: true,
      canManagePurchase: true,
      canManageProduction: true,
      canManageDesign: true,
      canManageAccounting: false,
      canAccessRoleConfiguration: false,
      canManageUsers: false,
      canViewAllReports: false,
      canViewAnalytics: true,
      canViewFinancials: false,
    },
    customer: {
      canViewDashboard: true,
      canManageInventory: false, // Can only view products
      canManageSales: false, // Can only view/manage their orders
      canManagePurchase: false,
      canManageProduction: false,
      canManageDesign: false,
      canManageAccounting: false,
      canAccessRoleConfiguration: false,
      canManageUsers: false,
      canViewAllReports: false,
      canViewAnalytics: false,
      canViewFinancials: false,
    },
  };

  const userPermissions = permissions[user.role] || permissions.customer;

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const value = {
    user,
    permissions: userPermissions,
    switchRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
