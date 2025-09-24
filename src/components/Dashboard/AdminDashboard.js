import React from 'react';
import { Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import {
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material';
import StatCard from './StatCard';
import { dashboardData, chartConfig } from './constants';

const AdminDashboard = () => (
  <>
    {/* Admin Stats */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Total Revenue'
          value={`$${(dashboardData.admin.totalRevenue / 1000).toFixed(0)}k`}
          icon={<AttachMoney />}
          color={chartConfig.colors.success}
          trend='+12.5%'
          subtitle='vs last month'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Total Orders'
          value={dashboardData.admin.totalOrders}
          icon={<ShoppingCart />}
          color={chartConfig.colors.primary}
          trend='+8.2%'
          subtitle={`${dashboardData.admin.ordersByStatus[1].value} processing`}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Customers'
          value={dashboardData.admin.totalCustomers}
          icon={<People />}
          color={chartConfig.colors.warning}
          trend='+15.3%'
          subtitle='active customers'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Products'
          value={dashboardData.admin.totalProducts}
          icon={<Inventory />}
          color={chartConfig.colors.purple}
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
                  color: chartConfig.colors.success,
                },
              ]}
              xAxis={[
                {
                  data: chartConfig.monthLabels,
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

export default AdminDashboard;
