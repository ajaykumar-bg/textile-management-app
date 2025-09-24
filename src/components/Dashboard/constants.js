// Dashboard constants and mock data

export const dashboardData = {
  // Admin specific data
  admin: {
    totalRevenue: 2456789,
    totalOrders: 3420,
    totalCustomers: 892,
    totalProducts: 1567,
    monthlyRevenue: [
      180000, 195000, 210000, 225000, 240000, 255000, 270000, 285000, 300000,
      315000, 330000, 345000,
    ],
    ordersByStatus: [
      { label: 'Completed', value: 2150, color: '#4caf50' },
      { label: 'Processing', value: 680, color: '#ff9800' },
      { label: 'Pending', value: 390, color: '#2196f3' },
      { label: 'Cancelled', value: 200, color: '#f44336' },
    ],
    topProducts: [
      { name: 'Cotton Fabric Premium', sales: 456, revenue: 123456 },
      { name: 'Silk Blend Textile', sales: 342, revenue: 98765 },
      { name: 'Polyester Mix', sales: 287, revenue: 76543 },
      { name: 'Linen Collection', sales: 234, revenue: 65432 },
    ],
  },
  // Staff specific data
  staff: {
    inventoryItems: 1567,
    lowStockItems: 23,
    ordersToProcess: 145,
    completedToday: 67,
    inventoryLevels: [
      { product: 'Cotton Fabric', current: 850, min: 100, max: 1000 },
      { product: 'Silk Blend', current: 45, min: 50, max: 500 },
      { product: 'Polyester', current: 320, min: 100, max: 600 },
      { product: 'Linen', current: 180, min: 80, max: 400 },
    ],
    dailyProduction: [45, 52, 48, 61, 55, 67, 59],
    ordersByPriority: [
      { label: 'High', value: 23, color: '#f44336' },
      { label: 'Medium', value: 87, color: '#ff9800' },
      { label: 'Low', value: 35, color: '#4caf50' },
    ],
  },
  // Customer specific data
  customer: {
    myOrders: 12,
    activeOrders: 3,
    completedOrders: 8,
    cancelledOrders: 1,
    orderHistory: [
      { month: 'Jan', orders: 2, amount: 1200 },
      { month: 'Feb', orders: 1, amount: 800 },
      { month: 'Mar', orders: 3, amount: 2100 },
      { month: 'Apr', orders: 2, amount: 1600 },
      { month: 'May', orders: 4, amount: 3200 },
      { month: 'Jun', orders: 0, amount: 0 },
    ],
    recentOrders: [
      {
        id: 'ORD-001',
        product: 'Cotton Premium',
        status: 'Delivered',
        amount: 456,
      },
      {
        id: 'ORD-002',
        product: 'Silk Collection',
        status: 'Processing',
        amount: 789,
      },
      {
        id: 'ORD-003',
        product: 'Linen Blend',
        status: 'Shipped',
        amount: 234,
      },
    ],
  },
};

// Chart configurations
export const chartConfig = {
  monthLabels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  weekLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  colors: {
    revenue: '#4caf50',
    orders: '#2196f3',
    production: '#2196f3',
    spending: '#4caf50',
    primary: '#2196f3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    purple: '#9c27b0',
  },
};

// Status color mappings
export const statusColors = {
  delivered: 'success',
  processing: 'warning',
  shipped: 'info',
  completed: 'success',
  pending: 'info',
  cancelled: 'error',
};
