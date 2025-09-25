import React, { useState, useMemo } from 'react';
import {
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
  TableSortLabel,
} from '@mui/material';
import { salesData } from './constants';

const CustomersTable = ({ formatCurrency, formatDate }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCustomers = useMemo(() => {
    return [...salesData.customers].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (
        orderBy === 'creditLimit' ||
        orderBy === 'currentBalance' ||
        orderBy === 'lifetimeValue'
      ) {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'lastOrderDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (typeof aValue === 'string' && orderBy !== 'lastOrderDate') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Customer Directory
        </Typography>
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
                    Customer ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={createSortHandler('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={createSortHandler('type')}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'contact'}
                    direction={orderBy === 'contact' ? order : 'asc'}
                    onClick={createSortHandler('contact')}
                  >
                    Contact
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'creditLimit'}
                    direction={orderBy === 'creditLimit' ? order : 'asc'}
                    onClick={createSortHandler('creditLimit')}
                  >
                    Credit Limit
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'currentBalance'}
                    direction={orderBy === 'currentBalance' ? order : 'asc'}
                    onClick={createSortHandler('currentBalance')}
                  >
                    Current Balance
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'lifetimeValue'}
                    direction={orderBy === 'lifetimeValue' ? order : 'asc'}
                    onClick={createSortHandler('lifetimeValue')}
                  >
                    Lifetime Value
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'lastOrderDate'}
                    direction={orderBy === 'lastOrderDate' ? order : 'asc'}
                    onClick={createSortHandler('lastOrderDate')}
                  >
                    Last Order
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCustomers.map((customer) => (
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
                    <Typography variant='body2'>{customer.contact}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {customer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatCurrency(customer.creditLimit)}</TableCell>
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
                  <TableCell>{formatDate(customer.lastOrderDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CustomersTable;
