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
      canViewAllReports: true,
      canManageUsers: true,
      canManageInventory: true,
      canViewAnalytics: true,
      canManageOrders: true,
      canAccessRoleConfiguration: true,
      canViewFinancials: true,
    },
    staff: {
      canViewAllReports: false,
      canManageUsers: false,
      canManageInventory: true,
      canViewAnalytics: true,
      canManageOrders: true,
      canAccessRoleConfiguration: false,
      canViewFinancials: false,
    },
    customer: {
      canViewAllReports: false,
      canManageUsers: false,
      canManageInventory: false,
      canViewAnalytics: false,
      canManageOrders: true, // Customers can manage their own orders
      canAccessRoleConfiguration: false,
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
