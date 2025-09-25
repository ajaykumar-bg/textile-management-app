import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
} from '@mui/material';

const PayablesTable = ({
  accountingData,
  formatCurrency,
  formatDate,
  paymentStatuses,
}) => {
  const [orderBy, setOrderBy] = useState('dueDate');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(property);
  };

  const sortedPayables = useMemo(() => {
    if (!accountingData?.payables) return [];

    return [...accountingData.payables].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle special cases
      if (orderBy === 'amount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (orderBy === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (orderBy === 'daysOverdue') {
        aValue = a.status === 'Overdue' ? Math.abs(a.daysOverdue) : 0;
        bValue = b.status === 'Overdue' ? Math.abs(b.daysOverdue) : 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [accountingData?.payables, orderBy, order]);
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Accounts Payable
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
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'vendor'}
                    direction={orderBy === 'vendor' ? order : 'asc'}
                    onClick={createSortHandler('vendor')}
                  >
                    Vendor
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'invoiceNumber'}
                    direction={orderBy === 'invoiceNumber' ? order : 'asc'}
                    onClick={createSortHandler('invoiceNumber')}
                  >
                    Invoice Number
                  </TableSortLabel>
                </TableCell>
                <TableCell align='right'>
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? order : 'asc'}
                    onClick={createSortHandler('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'dueDate'}
                    direction={orderBy === 'dueDate' ? order : 'asc'}
                    onClick={createSortHandler('dueDate')}
                  >
                    Due Date
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
                    active={orderBy === 'daysOverdue'}
                    direction={orderBy === 'daysOverdue' ? order : 'asc'}
                    onClick={createSortHandler('daysOverdue')}
                  >
                    Days Overdue
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPayables.map((payable) => (
                <TableRow key={payable.id} hover>
                  <TableCell>{payable.id}</TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {payable.vendor}
                    </Typography>
                  </TableCell>
                  <TableCell>{payable.invoiceNumber}</TableCell>
                  <TableCell align='right'>
                    {formatCurrency(payable.amount)}
                  </TableCell>
                  <TableCell>{formatDate(payable.dueDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={payable.status}
                      color={paymentStatuses[payable.status] || 'default'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    {payable.status === 'Overdue'
                      ? Math.abs(payable.daysOverdue)
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Button size='small' variant='outlined'>
                      Pay
                    </Button>
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

export default PayablesTable;
