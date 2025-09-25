import React, { useState, useMemo } from 'react';
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
  TableSortLabel,
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
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('desc'); // Default to desc to show newest first

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'totalAmount') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'orderDate' || orderBy === 'deliveryDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (
        typeof aValue === 'string' &&
        !['orderDate', 'deliveryDate'].includes(orderBy)
      ) {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [orders, orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={createSortHandler('id')}
              >
                Order ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'customerName'}
                direction={orderBy === 'customerName' ? order : 'asc'}
                onClick={createSortHandler('customerName')}
              >
                Customer
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'orderDate'}
                direction={orderBy === 'orderDate' ? order : 'asc'}
                onClick={createSortHandler('orderDate')}
              >
                Order Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'deliveryDate'}
                direction={orderBy === 'deliveryDate' ? order : 'asc'}
                onClick={createSortHandler('deliveryDate')}
              >
                Delivery Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? order : 'asc'}
                onClick={createSortHandler('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'priority'}
                direction={orderBy === 'priority' ? order : 'asc'}
                onClick={createSortHandler('priority')}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'totalAmount'}
                direction={orderBy === 'totalAmount' ? order : 'asc'}
                onClick={createSortHandler('totalAmount')}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'paymentStatus'}
                direction={orderBy === 'paymentStatus' ? order : 'asc'}
                onClick={createSortHandler('paymentStatus')}
              >
                Payment Status
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedOrders.map((order) => (
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
