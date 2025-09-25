import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { salesStatusColors, paymentStatusColors } from './constants';

const SalesOrdersTable = ({
  orders,
  permissions,
  onViewDetails,
  onEditOrder,
  formatDate,
  formatCurrency,
}) => {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size='small'>
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
          {orders.map((order) => (
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
                  <Button size='small' onClick={() => onViewDetails(order)}>
                    View
                  </Button>
                  {permissions.canManageOrders && (
                    <Button size='small' onClick={() => onEditOrder(order)}>
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
};

export default SalesOrdersTable;
