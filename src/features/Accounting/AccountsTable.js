import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
} from '@mui/material';

const AccountsTable = ({ accountingData, formatCurrency, formatDate }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(property);
  };

  const sortedAccounts = useMemo(() => {
    if (!accountingData?.accounts) return [];

    return [...accountingData.accounts].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle special cases
      if (orderBy === 'balance') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (orderBy === 'lastTransaction') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (orderBy === 'isActive') {
        aValue = a.isActive ? 'Active' : 'Inactive';
        bValue = b.isActive ? 'Active' : 'Inactive';
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [accountingData?.accounts, orderBy, order]);
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Chart of Accounts
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
                    Account ID
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
                    active={orderBy === 'category'}
                    direction={orderBy === 'category' ? order : 'asc'}
                    onClick={createSortHandler('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell align='right'>
                  <TableSortLabel
                    active={orderBy === 'balance'}
                    direction={orderBy === 'balance' ? order : 'asc'}
                    onClick={createSortHandler('balance')}
                  >
                    Balance
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'lastTransaction'}
                    direction={orderBy === 'lastTransaction' ? order : 'asc'}
                    onClick={createSortHandler('lastTransaction')}
                  >
                    Last Transaction
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'isActive'}
                    direction={orderBy === 'isActive' ? order : 'asc'}
                    onClick={createSortHandler('isActive')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAccounts.map((account) => (
                <TableRow key={account.id} hover>
                  <TableCell>{account.id}</TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {account.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={account.type}
                      variant='outlined'
                      size='small'
                      color={
                        account.type === 'Asset'
                          ? 'success'
                          : account.type === 'Liability'
                          ? 'error'
                          : account.type === 'Revenue'
                          ? 'primary'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>{account.category}</TableCell>
                  <TableCell align='right'>
                    <Typography
                      variant='body2'
                      color={
                        account.balance >= 0 ? 'success.main' : 'error.main'
                      }
                    >
                      {formatCurrency(account.balance)}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(account.lastTransaction)}</TableCell>
                  <TableCell>
                    <Chip
                      label={account.isActive ? 'Active' : 'Inactive'}
                      color={account.isActive ? 'success' : 'default'}
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

export default AccountsTable;
