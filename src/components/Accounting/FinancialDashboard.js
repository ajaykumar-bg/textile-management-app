import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import StatCard from '../Dashboard/StatCard';

const FinancialDashboard = ({ accountingData, formatCurrency }) => {
  const expenseChartData = accountingData.expenseCategories.map((item) => ({
    id: item.category,
    value: item.amount,
    label: item.category,
  }));

  return (
    <Grid container spacing={3}>
      {/* Key Financial Metrics */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Total Assets'
          value={formatCurrency(accountingData.financialSummary.totalAssets)}
          icon='💰'
          color='success.main'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Net Income'
          value={formatCurrency(accountingData.financialSummary.netIncome)}
          icon='📈'
          color='primary.main'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Current Ratio'
          value={accountingData.financialSummary.currentRatio}
          icon='⚖️'
          color='info.main'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Gross Profit Margin'
          value={`${accountingData.financialSummary.grossProfitMargin}%`}
          icon='📊'
          color='warning.main'
        />
      </Grid>

      {/* Monthly Performance Chart */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Monthly Financial Performance
            </Typography>
            <LineChart
              width={600}
              height={300}
              series={[
                {
                  data: accountingData.monthlyPerformance.map(
                    (item) => item.revenue
                  ),
                  label: 'Revenue',
                  color: '#4caf50',
                },
                {
                  data: accountingData.monthlyPerformance.map(
                    (item) => item.expenses
                  ),
                  label: 'Expenses',
                  color: '#f44336',
                },
                {
                  data: accountingData.monthlyPerformance.map(
                    (item) => item.netIncome
                  ),
                  label: 'Net Income',
                  color: '#2196f3',
                },
              ]}
              xAxis={[
                {
                  data: accountingData.monthlyPerformance.map((item) =>
                    item.month.slice(-3)
                  ),
                  scaleType: 'point',
                },
              ]}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Expense Breakdown */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Expense Breakdown
            </Typography>
            <PieChart
              series={[
                {
                  data: expenseChartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                },
              ]}
              width={300}
              height={300}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FinancialDashboard;
