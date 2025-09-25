import React from 'react';
import { useUser } from '../../context/UserContext';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import CustomerDashboard from './CustomerDashboard';

const DashboardContent = () => {
  const { user } = useUser();

  const renderDashboardByRole = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return null;
    }
  };

  return renderDashboardByRole();
};

export default DashboardContent;
