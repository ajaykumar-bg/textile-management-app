import React from 'react';
import { Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import { dashboardData } from './constants';

const TopProductsSection = () => {
  return (
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
  );
};

export default TopProductsSection;
