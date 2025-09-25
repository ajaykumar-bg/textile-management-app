import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { dashboardData } from './constants';

const OrderStatusChart = () => {
  return (
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
  );
};

export default OrderStatusChart;
