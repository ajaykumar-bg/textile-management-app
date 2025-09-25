import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
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
import { Search as SearchIcon } from '@mui/icons-material';
import {
  purchaseData,
  purchaseStatusColors,
  paymentStatusColors,
} from './constants';

const PurchaseOrdersTable = ({
  searchTerm,
  setSearchTerm,
  formatDate,
  formatCurrency,
}) => {
  const filteredOrders = purchaseData.orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
          <Table size='small'>
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
              {filteredOrders.map((order) => (
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
                      color={purchaseStatusColors[order.status] || 'default'}
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
                        paymentStatusColors[order.paymentStatus] || 'default'
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
  );
};

export default PurchaseOrdersTable;
