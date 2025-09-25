import React from 'react';
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
  Chip,
} from '@mui/material';

const AccountsTable = ({ accountingData, formatCurrency, formatDate }) => {
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
                <TableCell>Account ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align='right'>Balance</TableCell>
                <TableCell>Last Transaction</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountingData.accounts.map((account) => (
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
