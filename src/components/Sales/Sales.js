import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  GetApp as ExportIcon,
  Receipt as QuoteIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import SalesOverview from './SalesOverview';
import SalesOrderCard from './SalesOrderCard';
import { salesData, salesStatusColors, paymentStatusColors } from './constants';

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

  const TabPanel = ({ children, value, index }) => (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  const renderTableView = () => (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  {order.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{order.customerName}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  {order.customerContact}
                </Typography>
              </TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell>{formatDate(order.deliveryDate)}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={salesStatusColors[order.status] || 'default'}
                  size='small'
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={order.priority}
                  color={
                    order.priority === 'High'
                      ? 'error'
                      : order.priority === 'Medium'
                      ? 'warning'
                      : 'success'
                  }
                  size='small'
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  {formatCurrency(order.totalAmount)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={order.paymentStatus}
                  color={paymentStatusColors[order.paymentStatus] || 'default'}
                  size='small'
                />
              </TableCell>
              <TableCell>
                <Box display='flex' gap={1}>
                  <Button size='small' onClick={() => handleViewDetails(order)}>
                    View
                  </Button>
                  {permissions.canManageOrders && (
                    <Button size='small' onClick={() => handleEditOrder(order)}>
                      Edit
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCardView = () => (
    <Grid container spacing={3}>
      {filteredOrders.map((order) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={order.id}>
          <SalesOrderCard
            order={order}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onViewDetails={handleViewDetails}
            onConvert={handleConvertQuote}
            showActions={permissions.canManageOrders}
          />
        </Grid>
      ))}
    </Grid>
  );

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
            Sales Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Manage sales orders, quotations, customer relationships and track
            performance
          </Typography>
        </Box>
        {permissions.canManageOrders && (
          <Box display='flex' gap={2}>
            <Button
              variant='outlined'
              startIcon={<QuoteIcon />}
              onClick={handleAddQuote}
            >
              New Quote
            </Button>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleAddOrder}
            >
              New Order
            </Button>
            <Button
              variant='outlined'
              startIcon={<ExportIcon />}
              onClick={handleExport}
            >
              Export
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
        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems='center'>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  placeholder='Search orders...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label='Status'
                  >
                    <MenuItem value='all'>All Status</MenuItem>
                    {getUniqueStatuses().map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    label='Priority'
                  >
                    <MenuItem value='all'>All Priorities</MenuItem>
                    {getUniquePriorities().map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box display='flex' gap={1}>
                  <Button
                    variant={viewMode === 'cards' ? 'contained' : 'outlined'}
                    size='small'
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'contained' : 'outlined'}
                    size='small'
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  {filteredOrders.length} orders found
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Sales Orders */}
        {viewMode === 'cards' ? renderCardView() : renderTableView()}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Customers Table */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Customer Directory
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Credit Limit</TableCell>
                    <TableCell>Current Balance</TableCell>
                    <TableCell>Lifetime Value</TableCell>
                    <TableCell>Last Order</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.customers.map((customer) => (
                    <TableRow key={customer.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {customer.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{customer.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={customer.type}
                          size='small'
                          color={
                            customer.type === 'Wholesale'
                              ? 'primary'
                              : customer.type === 'Retail'
                              ? 'success'
                              : 'warning'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {customer.contact}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {customer.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(customer.creditLimit)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          color={
                            customer.currentBalance > 0
                              ? 'error.main'
                              : 'success.main'
                          }
                          fontWeight='medium'
                        >
                          {formatCurrency(customer.currentBalance)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {formatCurrency(customer.lifetimeValue)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(customer.lastOrderDate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {/* Quotations Table */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Sales Quotations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Quote ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Quote Date</TableCell>
                    <TableCell>Valid Until</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.quotations.map((quote) => (
                    <TableRow key={quote.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {quote.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {quote.customerName}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {quote.contactPerson}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDate(quote.quoteDate)}</TableCell>
                      <TableCell>{formatDate(quote.validUntil)}</TableCell>
                      <TableCell>
                        <Chip label={quote.status} color='info' size='small' />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {formatCurrency(quote.totalAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display='flex' gap={1}>
                          <Button size='small'>View</Button>
                          {permissions.canManageOrders && (
                            <Button
                              size='small'
                              variant='contained'
                              onClick={() => handleConvertQuote(quote)}
                            >
                              Convert
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Order Details Dialog */}
      <Dialog
        open={orderDetailsOpen}
        onClose={handleCloseDetails}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant='subtitle2'>
                  Customer Information
                </Typography>
                <Typography variant='body2'>
                  {selectedOrder.customerName}
                </Typography>
                <Typography variant='body2'>
                  {selectedOrder.customerContact}
                </Typography>
                <Typography variant='body2'>
                  {selectedOrder.customerEmail}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant='subtitle2'>Order Information</Typography>
                <Typography variant='body2'>
                  Order Date: {formatDate(selectedOrder.orderDate)}
                </Typography>
                <Typography variant='body2'>
                  Delivery Date: {formatDate(selectedOrder.deliveryDate)}
                </Typography>
                <Typography variant='body2'>
                  Status: {selectedOrder.status}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
                  Order Items
                </Typography>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
          {permissions.canManageOrders && (
            <Button
              variant='contained'
              onClick={() => handleEditOrder(selectedOrder)}
            >
              Edit Order
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sales;
