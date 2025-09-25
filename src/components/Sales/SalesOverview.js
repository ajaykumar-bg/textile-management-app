import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, BarChart, PieChart } from '@mui/x-charts';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  AttachMoney as RevenueIcon,
} from '@mui/icons-material';
import StatCard from '../Dashboard/StatCard';
import { salesData, salesChartConfig } from './constants';

const SalesOverview = ({ userRole = 'admin' }) => {
  // Calculate overview statistics
  const currentMonthData =
    salesData.performance.monthlyRevenue[
      salesData.performance.monthlyRevenue.length - 1
    ];
  const totalCustomers = salesData.customers.length;
  const totalRevenue = currentMonthData.revenue;
  const revenueTarget = currentMonthData.target;
  const targetAchievement = Math.round((totalRevenue / revenueTarget) * 100);

  // Active orders (not Draft, Cancelled, or Delivered)
  const activeOrders = salesData.orders.filter(
    (order) => !['Draft', 'Cancelled', 'Delivered'].includes(order.status)
  ).length;

  // Calculate growth (comparing last two months)
  const previousMonth =
    salesData.performance.monthlyRevenue[
      salesData.performance.monthlyRevenue.length - 2
    ];
  const revenueGrowth = previousMonth
    ? Math.round(
        ((currentMonthData.revenue - previousMonth.revenue) /
          previousMonth.revenue) *
          100
      )
    : 0;

  return (
    <>
      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Monthly Revenue'
            value={`$${(totalRevenue / 1000).toFixed(0)}k`}
            icon={<RevenueIcon />}
            color={salesChartConfig.colors.success}
            trend={`+${revenueGrowth}%`}
            subtitle={`${targetAchievement}% of target`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Active Orders'
            value={activeOrders}
            icon={<OrdersIcon />}
            color={salesChartConfig.colors.primary}
            subtitle='in progress'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Customers'
            value={totalCustomers}
            icon={<CustomersIcon />}
            color={salesChartConfig.colors.warning}
            subtitle='active clients'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Avg Order Value'
            value={`$${Math.round(
              totalRevenue / currentMonthData.orders
            ).toLocaleString()}`}
            icon={<TrendingUpIcon />}
            color={salesChartConfig.colors.info}
            subtitle='this month'
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Revenue vs Target (Monthly)
              </Typography>
              <LineChart
                width={650}
                height={300}
                series={[
                  {
                    data: salesData.performance.monthlyRevenue.map(
                      (item) => item.revenue
                    ),
                    label: 'Actual Revenue',
                    color: salesChartConfig.colors.primary,
                  },
                  {
                    data: salesData.performance.monthlyRevenue.map(
                      (item) => item.target
                    ),
                    label: 'Target',
                    color: salesChartConfig.colors.secondary,
                  },
                ]}
                xAxis={[
                  {
                    data: salesData.performance.monthlyRevenue.map(
                      (item) => item.month
                    ),
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
                Sales by Region
              </Typography>
              <PieChart
                series={[
                  {
                    data: salesData.performance.salesByRegion.map(
                      (region, index) => ({
                        id: region.region,
                        label: region.region,
                        value: region.percentage,
                        color:
                          salesChartConfig.regionColors[
                            index % salesChartConfig.regionColors.length
                          ],
                      })
                    ),
                    highlightScope: { faded: 'global', highlighted: 'item' },
                  },
                ]}
                width={320}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Top Performing Products
              </Typography>
              <BarChart
                width={450}
                height={300}
                series={[
                  {
                    data: salesData.performance.topProducts.map(
                      (product) => product.revenue
                    ),
                    label: 'Revenue ($)',
                    color: salesChartConfig.colors.success,
                  },
                ]}
                xAxis={[
                  {
                    data: salesData.performance.topProducts.map(
                      (product) => product.name.split(' ')[0]
                    ),
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
                Customer Segments
              </Typography>
              <Box sx={{ mt: 2 }}>
                {salesData.performance.customerSegments.map(
                  (segment, index) => (
                    <Box key={segment.segment} sx={{ mb: 3 }}>
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        mb={1}
                      >
                        <Typography variant='body2' fontWeight='medium'>
                          {segment.segment}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {segment.count} customers
                        </Typography>
                      </Box>
                      <Typography
                        variant='h6'
                        fontWeight='bold'
                        color='primary.main'
                        mb={1}
                      >
                        ${(segment.revenue / 1000).toFixed(0)}k revenue
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        Avg order: ${segment.avgOrder.toLocaleString()}
                      </Typography>
                      {index <
                        salesData.performance.customerSegments.length - 1 && (
                        <Box
                          sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            mt: 2,
                          }}
                        />
                      )}
                    </Box>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesOverview;
