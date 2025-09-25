import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
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

const QuotationsTable = ({
  permissions,
  onConvertQuote,
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

  const sortedQuotations = useMemo(() => {
    return [...salesData.quotations].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'totalAmount') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'quoteDate' || orderBy === 'validUntil') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (
        typeof aValue === 'string' &&
        !['quoteDate', 'validUntil'].includes(orderBy)
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
  }, [orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Sales Quotations
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
                    Quote ID
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
                    active={orderBy === 'quoteDate'}
                    direction={orderBy === 'quoteDate' ? order : 'asc'}
                    onClick={createSortHandler('quoteDate')}
                  >
                    Quote Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'validUntil'}
                    direction={orderBy === 'validUntil' ? order : 'asc'}
                    onClick={createSortHandler('validUntil')}
                  >
                    Valid Until
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedQuotations.map((quote) => (
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
                          onClick={() => onConvertQuote(quote)}
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
  );
};

export default QuotationsTable;
