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
import { purchaseData } from './constants';

const SuppliersTable = ({ formatDate, formatCurrency }) => {
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedSuppliers = useMemo(() => {
    return [...purchaseData.suppliers].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (
        orderBy === 'rating' ||
        orderBy === 'creditLimit' ||
        orderBy === 'currentBalance'
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
          Supplier Directory
        </Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={createSortHandler('name')}
                  >
                    Supplier
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'contactPerson'}
                    direction={orderBy === 'contactPerson' ? order : 'asc'}
                    onClick={createSortHandler('contactPerson')}
                  >
                    Contact
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
                    active={orderBy === 'rating'}
                    direction={orderBy === 'rating' ? order : 'asc'}
                    onClick={createSortHandler('rating')}
                  >
                    Rating
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
                    Balance
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
              {sortedSuppliers.map((supplier) => (
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
                  <TableCell>{formatCurrency(supplier.creditLimit)}</TableCell>
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
                  <TableCell>{formatDate(supplier.lastOrderDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SuppliersTable;
