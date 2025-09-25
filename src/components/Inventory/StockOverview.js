import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import { PieChart, BarChart } from '@mui/x-charts';
import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import StatCard from '../Dashboard/StatCard';
import { inventoryData, inventoryChartConfig } from './constants';

const StockOverview = ({ userRole = 'admin' }) => {
  // Calculate overview statistics
  const totalItems =
    inventoryData.fabrics.length + inventoryData.products.length;
  const lowStockItems = [
    ...inventoryData.fabrics,
    ...inventoryData.products,
  ].filter((item) => item.currentStock <= item.minStock).length;
  const totalValue = [
    ...inventoryData.fabrics,
    ...inventoryData.products,
  ].reduce((sum, item) => sum + item.totalValue, 0);
  const utilizationRate = Math.round(
    inventoryData.warehouses.reduce((sum, wh) => sum + wh.utilization, 0) /
      inventoryData.warehouses.length
  );

  // Category distribution data for pie chart
  const categoryData = inventoryData.categories.map((cat, index) => ({
    id: cat.id,
    label: cat.name,
    value: cat.count,
    color:
      inventoryChartConfig.categoryColors[
        index % inventoryChartConfig.categoryColors.length
      ],
  }));

  // Stock level trends for bar chart
  const stockTrendData = inventoryData.fabrics.slice(0, 6).map((item) => ({
    name: item.name.split(' ')[0],
    current: item.currentStock,
    min: item.minStock,
    max: item.maxStock,
  }));

  return (
    <>
      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Items'
            value={totalItems}
            icon={<InventoryIcon />}
            color={inventoryChartConfig.colors.primary}
            subtitle='in inventory'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Low Stock Alert'
            value={lowStockItems}
            icon={<WarningIcon />}
            color={inventoryChartConfig.colors.warning}
            subtitle='need attention'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Value'
            value={`$${(totalValue / 1000).toFixed(0)}k`}
            icon={<MoneyIcon />}
            color={inventoryChartConfig.colors.success}
            trend='+8.5%'
            subtitle='inventory worth'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Utilization'
            value={`${utilizationRate}%`}
            icon={<TrendingUpIcon />}
            color={inventoryChartConfig.colors.info}
            subtitle='warehouse capacity'
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Stock Levels by Item
              </Typography>
              <BarChart
                width={650}
                height={300}
                series={[
                  {
                    data: stockTrendData.map((item) => item.current),
                    label: 'Current Stock',
                    color: inventoryChartConfig.colors.primary,
                  },
                  {
                    data: stockTrendData.map((item) => item.min),
                    label: 'Minimum Level',
                    color: inventoryChartConfig.colors.warning,
                  },
                ]}
                xAxis={[
                  {
                    data: stockTrendData.map((item) => item.name),
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
                Inventory by Category
              </Typography>
              <PieChart
                series={[
                  {
                    data: categoryData,
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

      {/* Warehouse Utilization */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Warehouse Utilization
              </Typography>
              <Grid container spacing={2}>
                {inventoryData.warehouses.map((warehouse, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={warehouse.id}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant='subtitle1' fontWeight='bold'>
                        {warehouse.name}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' mb={2}>
                        {warehouse.location} • {warehouse.capacity}
                      </Typography>
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        mb={1}
                      >
                        <Typography variant='body2'>Utilization</Typography>
                        <Typography variant='h6' fontWeight='bold'>
                          {warehouse.utilization}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant='determinate'
                        value={warehouse.utilization}
                        sx={{ height: 8, borderRadius: 4 }}
                        color={
                          warehouse.utilization > 80
                            ? 'error'
                            : warehouse.utilization > 60
                            ? 'warning'
                            : 'success'
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default StockOverview;
