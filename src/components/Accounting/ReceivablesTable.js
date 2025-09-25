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

const ReceivablesTable = ({
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

  const sortedReceivables = useMemo(() => {
    if (!accountingData?.receivables) return [];

    return [...accountingData.receivables].sort((a, b) => {
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
        aValue = a.status === 'Overdue' ? a.daysOverdue : 0;
        bValue = b.status === 'Overdue' ? b.daysOverdue : 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [accountingData?.receivables, orderBy, order]);
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Accounts Receivable
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
                    active={orderBy === 'customer'}
                    direction={orderBy === 'customer' ? order : 'asc'}
                    onClick={createSortHandler('customer')}
                  >
                    Customer
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
              {sortedReceivables.map((receivable) => (
                <TableRow key={receivable.id} hover>
                  <TableCell>{receivable.id}</TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {receivable.customer}
                    </Typography>
                  </TableCell>
                  <TableCell>{receivable.invoiceNumber}</TableCell>
                  <TableCell align='right'>
                    {formatCurrency(receivable.amount)}
                  </TableCell>
                  <TableCell>{formatDate(receivable.dueDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={receivable.status}
                      color={paymentStatuses[receivable.status] || 'default'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    {receivable.status === 'Overdue'
                      ? receivable.daysOverdue
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Button size='small' variant='outlined'>
                      Follow Up
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

export default ReceivablesTable;
