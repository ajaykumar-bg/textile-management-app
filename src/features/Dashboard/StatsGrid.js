import React from 'react';
import { Grid } from '@mui/material';
import {
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material';
import StatCard from './StatCard';
import { dashboardData, chartConfig } from './constants';

const StatsGrid = () => {
  const statsConfig = [
    {
      title: 'Total Revenue',
      value: `$${(dashboardData.admin.totalRevenue / 1000).toFixed(0)}k`,
      icon: <AttachMoney />,
      color: chartConfig.colors.success,
      trend: '+12.5%',
      subtitle: 'vs last month',
    },
    {
      title: 'Total Orders',
      value: dashboardData.admin.totalOrders,
      icon: <ShoppingCart />,
      color: chartConfig.colors.primary,
      trend: '+8.2%',
      subtitle: `${dashboardData.admin.ordersByStatus[1].value} processing`,
    },
    {
      title: 'Customers',
      value: dashboardData.admin.totalCustomers,
      icon: <People />,
      color: chartConfig.colors.warning,
      trend: '+15.3%',
      subtitle: 'active customers',
    },
    {
      title: 'Products',
      value: dashboardData.admin.totalProducts,
      icon: <Inventory />,
      color: chartConfig.colors.purple,
      subtitle: 'in catalog',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statsConfig.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;
