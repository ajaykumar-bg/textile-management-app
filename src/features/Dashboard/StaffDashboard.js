import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import {
  Inventory,
  Warning,
  Assignment,
  CheckCircle,
} from '@mui/icons-material';
import StatCard from './StatCard';
import { dashboardData, chartConfig } from './constants';

const StaffDashboard = () => (
  <>
    {/* Staff Stats */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Inventory Items'
          value={dashboardData.staff.inventoryItems}
          icon={<Inventory />}
          color={chartConfig.colors.primary}
          subtitle='total products'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Low Stock Alert'
          value={dashboardData.staff.lowStockItems}
          icon={<Warning />}
          color={chartConfig.colors.error}
          subtitle='need reorder'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Orders to Process'
          value={dashboardData.staff.ordersToProcess}
          icon={<Assignment />}
          color={chartConfig.colors.warning}
          subtitle='pending action'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Completed Today'
          value={dashboardData.staff.completedToday}
          icon={<CheckCircle />}
          color={chartConfig.colors.success}
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
                  color: chartConfig.colors.production,
                },
              ]}
              xAxis={[
                {
                  data: chartConfig.weekLabels,
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
                        item.current < item.min ? 'error.main' : 'success.main'
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

export default StaffDashboard;
