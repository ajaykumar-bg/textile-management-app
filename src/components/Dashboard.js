import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Paper,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import { BarChart, LineChart, PieChart, SparkLineChart } from '@mui/x-charts';
import {
  TrendingUp,
  Inventory,
  ShoppingCart,
  People,
  AttachMoney,
  Assignment,
  LocalShipping,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user, permissions } = useUser();

  // Mock data for different metrics
  const dashboardData = {
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

  // Stat Card Component
  const StatCard = ({ title, value, icon, color, trend, subtitle }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Box>
            <Typography variant='h6' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Typography
              variant='h4'
              fontWeight='bold'
              color={color || 'primary.main'}
            >
              {typeof value === 'number' && value > 1000
                ? `${(value / 1000).toFixed(1)}k`
                : value}
            </Typography>
            {subtitle && (
              <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box display='flex' alignItems='center' sx={{ mt: 1 }}>
                <TrendingUp fontSize='small' color='success' />
                <Typography
                  variant='body2'
                  color='success.main'
                  sx={{ ml: 0.5 }}
                >
                  {trend}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{ bgcolor: color || 'primary.main', width: 56, height: 56 }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  // Admin Dashboard Content
  const AdminDashboard = () => (
    <>
      {/* Admin Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Revenue'
            value={`$${(dashboardData.admin.totalRevenue / 1000).toFixed(0)}k`}
            icon={<AttachMoney />}
            color='#4caf50'
            trend='+12.5%'
            subtitle='vs last month'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Orders'
            value={dashboardData.admin.totalOrders}
            icon={<ShoppingCart />}
            color='#2196f3'
            trend='+8.2%'
            subtitle={`${dashboardData.admin.ordersByStatus[1].value} processing`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Customers'
            value={dashboardData.admin.totalCustomers}
            icon={<People />}
            color='#ff9800'
            trend='+15.3%'
            subtitle='active customers'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Products'
            value={dashboardData.admin.totalProducts}
            icon={<Inventory />}
            color='#9c27b0'
            subtitle='in catalog'
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Monthly Revenue Trend
              </Typography>
              <LineChart
                width={700}
                height={300}
                series={[
                  {
                    data: dashboardData.admin.monthlyRevenue,
                    label: 'Revenue ($)',
                    color: '#4caf50',
                  },
                ]}
                xAxis={[
                  {
                    data: [
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
                    scaleType: 'point',
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Orders by Status
              </Typography>
              <PieChart
                width={300}
                height={300}
                series={[
                  {
                    data: dashboardData.admin.ordersByStatus.map((item) => ({
                      id: item.label,
                      value: item.value,
                      label: item.label,
                      color: item.color,
                    })),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Products */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Top Performing Products
              </Typography>
              <Grid container spacing={2}>
                {dashboardData.admin.topProducts.map((product, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        {product.name}
                      </Typography>
                      <Typography variant='h6' color='primary.main'>
                        ${product.revenue.toLocaleString()}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {product.sales} units sold
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  // Staff Dashboard Content
  const StaffDashboard = () => (
    <>
      {/* Staff Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Inventory Items'
            value={dashboardData.staff.inventoryItems}
            icon={<Inventory />}
            color='#2196f3'
            subtitle='total products'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Low Stock Alert'
            value={dashboardData.staff.lowStockItems}
            icon={<Warning />}
            color='#f44336'
            subtitle='need reorder'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Orders to Process'
            value={dashboardData.staff.ordersToProcess}
            icon={<Assignment />}
            color='#ff9800'
            subtitle='pending action'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Completed Today'
            value={dashboardData.staff.completedToday}
            icon={<CheckCircle />}
            color='#4caf50'
            trend='+5 vs yesterday'
          />
        </Grid>
      </Grid>

      {/* Staff Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Daily Production (This Week)
              </Typography>
              <BarChart
                width={400}
                height={300}
                series={[
                  {
                    data: dashboardData.staff.dailyProduction,
                    label: 'Units Produced',
                    color: '#2196f3',
                  },
                ]}
                xAxis={[
                  {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    scaleType: 'band',
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Orders by Priority
              </Typography>
              <PieChart
                width={400}
                height={300}
                series={[
                  {
                    data: dashboardData.staff.ordersByPriority.map((item) => ({
                      id: item.label,
                      value: item.value,
                      label: item.label,
                      color: item.color,
                    })),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Inventory Levels */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Inventory Levels
              </Typography>
              <Grid container spacing={2}>
                {dashboardData.staff.inventoryLevels.map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        {item.product}
                      </Typography>
                      <Typography
                        variant='h6'
                        color={
                          item.current < item.min
                            ? 'error.main'
                            : 'success.main'
                        }
                      >
                        {item.current} units
                      </Typography>
                      <LinearProgress
                        variant='determinate'
                        value={(item.current / item.max) * 100}
                        sx={{ mt: 1, mb: 1 }}
                        color={item.current < item.min ? 'error' : 'success'}
                      />
                      <Typography variant='body2' color='text.secondary'>
                        Min: {item.min} | Max: {item.max}
                      </Typography>
                      {item.current < item.min && (
                        <Chip
                          label='Reorder Required'
                          color='error'
                          size='small'
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  // Customer Dashboard Content
  const CustomerDashboard = () => (
    <>
      {/* Customer Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Orders'
            value={dashboardData.customer.myOrders}
            icon={<ShoppingCart />}
            color='#2196f3'
            subtitle='all time'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Active Orders'
            value={dashboardData.customer.activeOrders}
            icon={<LocalShipping />}
            color='#ff9800'
            subtitle='in progress'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Completed'
            value={dashboardData.customer.completedOrders}
            icon={<CheckCircle />}
            color='#4caf50'
            subtitle='delivered'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Cancelled'
            value={dashboardData.customer.cancelledOrders}
            icon={<Warning />}
            color='#f44336'
            subtitle='refunded'
          />
        </Grid>
      </Grid>

      {/* Customer Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Order History (Last 6 Months)
              </Typography>
              <BarChart
                width={600}
                height={300}
                series={[
                  {
                    data: dashboardData.customer.orderHistory.map(
                      (item) => item.orders
                    ),
                    label: 'Orders',
                    color: '#2196f3',
                  },
                ]}
                xAxis={[
                  {
                    data: dashboardData.customer.orderHistory.map(
                      (item) => item.month
                    ),
                    scaleType: 'band',
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Spending Trend
              </Typography>
              <SparkLineChart
                data={dashboardData.customer.orderHistory.map(
                  (item) => item.amount
                )}
                width={300}
                height={200}
                color='#4caf50'
              />
              <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Total spent: $
                {dashboardData.customer.orderHistory
                  .reduce((sum, item) => sum + item.amount, 0)
                  .toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Recent Orders
              </Typography>
              <Grid container spacing={2}>
                {dashboardData.customer.recentOrders.map((order, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='flex-start'
                      >
                        <Box>
                          <Typography variant='subtitle1' fontWeight='bold'>
                            {order.id}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {order.product}
                          </Typography>
                          <Typography
                            variant='h6'
                            color='primary.main'
                            sx={{ mt: 1 }}
                          >
                            ${order.amount}
                          </Typography>
                        </Box>
                        <Chip
                          label={order.status}
                          color={
                            order.status === 'Delivered'
                              ? 'success'
                              : order.status === 'Processing'
                              ? 'warning'
                              : 'info'
                          }
                          size='small'
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' gutterBottom>
          Dashboard
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Welcome back, {user.name}! Here's what's happening with your{' '}
          {user.role === 'customer' ? 'orders' : 'textile management'}.
        </Typography>
      </Box>

      {/* Role-based Dashboard Content */}
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'staff' && <StaffDashboard />}
      {user.role === 'customer' && <CustomerDashboard />}

      {/* No permissions fallback */}
      {!permissions.canViewAnalytics && user.role !== 'customer' && (
        <Alert severity='info' sx={{ mt: 3 }}>
          Limited dashboard view. Contact your administrator for more access.
        </Alert>
      )}
    </Box>
  );
};

export default Dashboard;
