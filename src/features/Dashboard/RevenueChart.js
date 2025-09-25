import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { dashboardData, chartConfig } from './constants';

const RevenueChart = () => {
  return (
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
  );
};

export default RevenueChart;
