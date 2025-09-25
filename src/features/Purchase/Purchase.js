import React, { useState } from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';
import { useUser } from '../../context/UserContext';
import PurchaseHeader from './PurchaseHeader';
import PurchaseOrdersTable from './PurchaseOrdersTable';
import SuppliersTable from './SuppliersTable';
import RequisitionsTable from './RequisitionsTable';
import TabPanel from './TabPanel';

const Purchase = () => {
  const { permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddPurchaseOrder = () => {
    console.log('Add new purchase order');
  };

  const handleExport = () => {
    console.log('Export purchase data');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <PurchaseHeader
        permissions={permissions}
        onAddPurchaseOrder={handleAddPurchaseOrder}
        onExport={handleExport}
      />

      {/* Tabs */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Purchase Orders' />
          <Tab label='Suppliers' />
          <Tab label='Requisitions' />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <PurchaseOrdersTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SuppliersTable
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <RequisitionsTable
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabPanel>
    </Box>
  );
};

export default Purchase;
