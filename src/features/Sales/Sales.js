import React, { useState } from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';
import { useUser } from '../../context/UserContext';
import SalesOverview from './SalesOverview';
import SalesHeader from './SalesHeader';
import SalesFilters from './SalesFilters';
import SalesOrdersTable from './SalesOrdersTable';
import SalesOrdersGrid from './SalesOrdersGrid';
import CustomersTable from './CustomersTable';
import QuotationsTable from './QuotationsTable';
import OrderDetailsDialog from './OrderDetailsDialog';
import TabPanel from './TabPanel';
import { salesData } from './constants';

const Sales = () => {
  const { user, permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddOrder = () => {
    console.log('Add new sales order');
  };

  const handleAddQuote = () => {
    console.log('Create new quotation');
  };

  const handleEditOrder = (order) => {
    console.log('Edit order:', order.id);
  };

  const handleDeleteOrder = (order) => {
    console.log('Delete order:', order.id);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const handleConvertQuote = (quote) => {
    console.log('Convert quote to order:', quote.id);
  };

  const handleExport = () => {
    console.log('Export sales data');
  };

  const handleCloseDetails = () => {
    setOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  // Filter orders
  const filteredOrders = salesData.orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || order.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getUniqueStatuses = () => {
    const statuses = [
      ...new Set(salesData.orders.map((order) => order.status)),
    ];
    return statuses.sort();
  };

  const getUniquePriorities = () => {
    const priorities = [
      ...new Set(salesData.orders.map((order) => order.priority)),
    ];
    return priorities.sort();
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
      {/* Header */}
      <SalesHeader
        permissions={permissions}
        onAddOrder={handleAddOrder}
        onAddQuote={handleAddQuote}
        onExport={handleExport}
      />

      {/* Tabs */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Sales Overview' />
          <Tab label='Sales Orders' />
          <Tab label='Customers' />
          <Tab label='Quotations' />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <SalesOverview userRole={user.role} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Filters */}
        <SalesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredOrdersCount={filteredOrders.length}
          getUniqueStatuses={getUniqueStatuses}
          getUniquePriorities={getUniquePriorities}
        />

        {/* Sales Orders */}
        {viewMode === 'cards' ? (
          <SalesOrdersGrid
            orders={filteredOrders}
            permissions={permissions}
            onEditOrder={handleEditOrder}
            onDeleteOrder={handleDeleteOrder}
            onViewDetails={handleViewDetails}
            onConvertQuote={handleConvertQuote}
          />
        ) : (
          <SalesOrdersTable
            orders={filteredOrders}
            permissions={permissions}
            onViewDetails={handleViewDetails}
            onEditOrder={handleEditOrder}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <CustomersTable
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <QuotationsTable
          permissions={permissions}
          onConvertQuote={handleConvertQuote}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabPanel>

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        open={orderDetailsOpen}
        onClose={handleCloseDetails}
        selectedOrder={selectedOrder}
        permissions={permissions}
        onEditOrder={handleEditOrder}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
      />
    </Box>
  );
};

export default Sales;
