import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { productionData } from './constants';

const PerformanceTab = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Monthly Production Performance
            </Typography>
            <BarChart
              width={800}
              height={300}
              series={[
                {
                  data: productionData.performance.monthlyProduction.map(
                    (item) => item.produced
                  ),
                  label: 'Actual Production',
                  color: '#4caf50',
                },
                {
                  data: productionData.performance.monthlyProduction.map(
                    (item) => item.target
                  ),
                  label: 'Target',
                  color: '#2196f3',
                },
              ]}
              xAxis={[
                {
                  data: productionData.performance.monthlyProduction.map(
                    (item) => item.month
                  ),
                  scaleType: 'band',
                },
              ]}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PerformanceTab;
