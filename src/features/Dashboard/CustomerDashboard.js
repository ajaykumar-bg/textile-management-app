import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
  Chip,
} from '@mui/material';
import { BarChart, SparkLineChart } from '@mui/x-charts';
import {
  ShoppingCart,
  LocalShipping,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import StatCard from './StatCard';
import { dashboardData, statusColors } from './constants';

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
                          statusColors[order.status.toLowerCase()] || 'default'
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

export default CustomerDashboard;
