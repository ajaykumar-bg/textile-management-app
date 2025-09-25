import React, { useState, useMemo } from 'react';
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
  TableSortLabel,
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
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('desc'); // Default to desc to show newest first

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredOrders = purchaseData.orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'totalAmount') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'orderDate' || orderBy === 'expectedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (
        typeof aValue === 'string' &&
        !['orderDate', 'expectedDate'].includes(orderBy)
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
  }, [filteredOrders, orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };

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
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={createSortHandler('id')}
                  >
                    PO Number
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'supplierName'}
                    direction={orderBy === 'supplierName' ? order : 'asc'}
                    onClick={createSortHandler('supplierName')}
                  >
                    Supplier
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
                    active={orderBy === 'expectedDate'}
                    direction={orderBy === 'expectedDate' ? order : 'asc'}
                    onClick={createSortHandler('expectedDate')}
                  >
                    Expected Date
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
