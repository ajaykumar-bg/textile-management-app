/**
 * Dashboard utility functions
 */

export const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
};

export const formatNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

export const getWelcomeMessage = (role) => {
  const messages = {
    admin: "Here's what's happening with your textile management system.",
    staff: "Here's what's happening with your textile operations.",
    customer: "Here's what's happening with your orders.",
  };
  return messages[role] || "Here's your dashboard overview.";
};

export const getTrendColor = (trend) => {
  if (trend?.startsWith('+')) return 'success.main';
  if (trend?.startsWith('-')) return 'error.main';
  return 'text.secondary';
};

export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
};

export const getStatCardConfig = (role, data) => {
  const configs = {
    admin: [
      {
        title: 'Total Revenue',
        value: formatCurrency(data.totalRevenue),
        key: 'revenue',
      },
      {
        title: 'Total Orders',
        value: data.totalOrders,
        key: 'orders',
      },
      {
        title: 'Customers',
        value: data.totalCustomers,
        key: 'customers',
      },
      {
        title: 'Products',
        value: data.totalProducts,
        key: 'products',
      },
    ],
    staff: [
      {
        title: 'Active Orders',
        value: data.activeOrders,
        key: 'orders',
      },
      {
        title: 'Pending Tasks',
        value: data.pendingTasks,
        key: 'tasks',
      },
      {
        title: 'Production Queue',
        value: data.productionQueue,
        key: 'production',
      },
    ],
    customer: [
      {
        title: 'My Orders',
        value: data.myOrders,
        key: 'orders',
      },
      {
        title: 'Order Value',
        value: formatCurrency(data.orderValue),
        key: 'value',
      },
    ],
  };

  return configs[role] || [];
};
