import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  GetApp as ExportIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import {
  purchaseData,
  purchaseStatusColors,
  paymentStatusColors,
} from './constants';

const Purchase = () => {
  const { permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (!dateString) return 'N/A';
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
            Purchase Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Manage purchase orders, suppliers, requisitions and procurement
            processes
          </Typography>
        </Box>
        {permissions.canManageInventory && (
          <Box display='flex' gap={2}>
            <Button variant='contained' startIcon={<AddIcon />}>
              New PO
            </Button>
            <Button variant='outlined' startIcon={<ExportIcon />}>
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
          <Tab label='Purchase Orders' />
          <Tab label='Suppliers' />
          <Tab label='Requisitions' />
        </Tabs>
      </Card>

      {/* Purchase Orders Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card elevation={2}>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={2}
            >
              <Typography variant='h6'>Purchase Orders</Typography>
              <TextField
                size='small'
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
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PO Number</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Expected Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseData.orders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {order.supplierName}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>{formatDate(order.expectedDate)}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={
                            purchaseStatusColors[order.status] || 'default'
                          }
                          size='small'
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
                          color={
                            paymentStatusColors[order.paymentStatus] ||
                            'default'
                          }
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

      {/* Suppliers Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Supplier Directory
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Credit Limit</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Last Order</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseData.suppliers.map((supplier) => (
                    <TableRow key={supplier.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {supplier.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {supplier.contactPerson}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {supplier.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={supplier.type} size='small' color='info' />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          ⭐ {supplier.rating}/5
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(supplier.creditLimit)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          color={
                            supplier.currentBalance > 0
                              ? 'error.main'
                              : 'success.main'
                          }
                          fontWeight='medium'
                        >
                          {formatCurrency(supplier.currentBalance)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(supplier.lastOrderDate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Requisitions Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Purchase Requisitions
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PR Number</TableCell>
                    <TableCell>Requested By</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Required Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Estimated Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseData.requisitions.map((req) => (
                    <TableRow key={req.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {req.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{req.requestedBy}</TableCell>
                      <TableCell>{req.department}</TableCell>
                      <TableCell>{formatDate(req.requestDate)}</TableCell>
                      <TableCell>{formatDate(req.requiredDate)}</TableCell>
                      <TableCell>
                        <Chip
                          label={req.status}
                          color={
                            req.status === 'Approved' ? 'success' : 'warning'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {formatCurrency(req.totalEstimated)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default Purchase;
