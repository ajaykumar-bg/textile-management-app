import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  AccountBalance as AccountIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { LineChart, PieChart } from '@mui/x-charts';
import { useUser } from '../../context/UserContext';
import StatCard from '../Dashboard/StatCard';
import { accountingData, paymentStatuses } from './constants';

const Accounting = () => {
  const { permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const TabPanel = ({ children, value, index }) => (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  const expenseChartData = accountingData.expenseCategories.map((item) => ({
    id: item.category,
    value: item.amount,
    label: item.category,
  }));

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Box>
          <Typography variant='h4' gutterBottom>
            Accounting & Finance
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Financial management, reporting and analysis
          </Typography>
        </Box>
        {permissions.canManageInventory && (
          <Box display='flex' gap={2}>
            <Button variant='outlined' startIcon={<AccountIcon />}>
              Chart of Accounts
            </Button>
            <Button variant='outlined' startIcon={<ReceiptIcon />}>
              New Transaction
            </Button>
            <Button variant='contained' startIcon={<AddIcon />}>
              Financial Report
            </Button>
          </Box>
        )}
      </Box>

      {/* Tabs */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Dashboard' />
          <Tab label='Accounts' />
          <Tab label='Transactions' />
          <Tab label='Payables' />
          <Tab label='Receivables' />
          <Tab label='Reports' />
        </Tabs>
      </Card>

      {/* Dashboard Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Key Financial Metrics */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title='Total Assets'
              value={formatCurrency(
                accountingData.financialSummary.totalAssets
              )}
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
      </TabPanel>

      {/* Accounts Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Chart of Accounts
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align='right'>Balance</TableCell>
                    <TableCell>Last Transaction</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountingData.accounts.map((account) => (
                    <TableRow key={account.id} hover>
                      <TableCell>{account.id}</TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {account.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={account.type}
                          variant='outlined'
                          size='small'
                          color={
                            account.type === 'Asset'
                              ? 'success'
                              : account.type === 'Liability'
                              ? 'error'
                              : account.type === 'Revenue'
                              ? 'primary'
                              : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>{account.category}</TableCell>
                      <TableCell align='right'>
                        <Typography
                          variant='body2'
                          color={
                            account.balance >= 0 ? 'success.main' : 'error.main'
                          }
                        >
                          {formatCurrency(account.balance)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(account.lastTransaction)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={account.isActive ? 'Active' : 'Inactive'}
                          color={account.isActive ? 'success' : 'default'}
                          size='small'
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Transactions Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Recent Transactions
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell>Reference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountingData.transactions.map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.type}
                          color={
                            transaction.type === 'Debit' ? 'error' : 'success'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Typography
                          variant='body2'
                          color={
                            transaction.type === 'Credit'
                              ? 'success.main'
                              : 'error.main'
                          }
                        >
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Payables Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Accounts Payable
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Days Overdue</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountingData.payables.map((payable) => (
                    <TableRow key={payable.id} hover>
                      <TableCell>{payable.id}</TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {payable.vendor}
                        </Typography>
                      </TableCell>
                      <TableCell>{payable.invoiceNumber}</TableCell>
                      <TableCell align='right'>
                        {formatCurrency(payable.amount)}
                      </TableCell>
                      <TableCell>{formatDate(payable.dueDate)}</TableCell>
                      <TableCell>
                        <Chip
                          label={payable.status}
                          color={paymentStatuses[payable.status] || 'default'}
                          size='small'
                        />
                      </TableCell>
                      <TableCell>
                        {payable.status === 'Overdue'
                          ? Math.abs(payable.daysOverdue)
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Button size='small' variant='outlined'>
                          Pay
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Receivables Tab */}
      <TabPanel value={tabValue} index={4}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Accounts Receivable
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Days Overdue</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountingData.receivables.map((receivable) => (
                    <TableRow key={receivable.id} hover>
                      <TableCell>{receivable.id}</TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {receivable.customer}
                        </Typography>
                      </TableCell>
                      <TableCell>{receivable.invoiceNumber}</TableCell>
                      <TableCell align='right'>
                        {formatCurrency(receivable.amount)}
                      </TableCell>
                      <TableCell>{formatDate(receivable.dueDate)}</TableCell>
                      <TableCell>
                        <Chip
                          label={receivable.status}
                          color={
                            paymentStatuses[receivable.status] || 'default'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell>
                        {receivable.status === 'Overdue'
                          ? receivable.daysOverdue
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Button size='small' variant='outlined'>
                          Follow Up
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Reports Tab */}
      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={3}>
          {/* Budget vs Actual */}
          <Grid size={{ xs: 12 }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Budget vs Actual Performance
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align='right'>Budget</TableCell>
                        <TableCell align='right'>Actual</TableCell>
                        <TableCell align='right'>Variance</TableCell>
                        <TableCell>Variance %</TableCell>
                        <TableCell>Performance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accountingData.budgetVsActual.map((item, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant='body2' fontWeight='medium'>
                              {item.category}
                            </Typography>
                          </TableCell>
                          <TableCell align='right'>
                            {formatCurrency(item.budget)}
                          </TableCell>
                          <TableCell align='right'>
                            {formatCurrency(item.actual)}
                          </TableCell>
                          <TableCell align='right'>
                            <Typography
                              variant='body2'
                              color={
                                item.variance >= 0
                                  ? 'error.main'
                                  : 'success.main'
                              }
                            >
                              {formatCurrency(item.variance)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant='body2'
                              color={
                                item.variancePercent >= 0
                                  ? 'error.main'
                                  : 'success.main'
                              }
                            >
                              {item.variancePercent.toFixed(1)}%
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <LinearProgress
                              variant='determinate'
                              value={Math.min(
                                100,
                                (item.actual / item.budget) * 100
                              )}
                              color={item.variance <= 0 ? 'success' : 'error'}
                              sx={{ width: 100 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Accounting;
