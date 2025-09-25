import React from 'react';
import { Grid } from '@mui/material';
import RevenueChart from './RevenueChart';
import OrderStatusChart from './OrderStatusChart';

const ChartsSection = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <RevenueChart />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <OrderStatusChart />
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
