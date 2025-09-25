import React, { useState } from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';
import { useUser } from '../../context/UserContext';
import { accountingData, paymentStatuses } from './constants';
import AccountingHeader from './AccountingHeader';
import FinancialDashboard from './FinancialDashboard';
import AccountsTable from './AccountsTable';
import TransactionsTable from './TransactionsTable';
import PayablesTable from './PayablesTable';
import ReceivablesTable from './ReceivablesTable';
import ReportsTab from './ReportsTab';
import TabPanel from './TabPanel';

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

  return (
    <Box sx={{ p: 3 }}>
      <AccountingHeader permissions={permissions} />

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
        <FinancialDashboard
          accountingData={accountingData}
          formatCurrency={formatCurrency}
        />
      </TabPanel>

      {/* Accounts Tab */}
      <TabPanel value={tabValue} index={1}>
        <AccountsTable
          accountingData={accountingData}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </TabPanel>

      {/* Transactions Tab */}
      <TabPanel value={tabValue} index={2}>
        <TransactionsTable
          accountingData={accountingData}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </TabPanel>

      {/* Payables Tab */}
      <TabPanel value={tabValue} index={3}>
        <PayablesTable
          accountingData={accountingData}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          paymentStatuses={paymentStatuses}
        />
      </TabPanel>

      {/* Receivables Tab */}
      <TabPanel value={tabValue} index={4}>
        <ReceivablesTable
          accountingData={accountingData}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          paymentStatuses={paymentStatuses}
        />
      </TabPanel>

      {/* Reports Tab */}
      <TabPanel value={tabValue} index={5}>
        <ReportsTab
          accountingData={accountingData}
          formatCurrency={formatCurrency}
        />
      </TabPanel>
    </Box>
  );
};

export default Accounting;
