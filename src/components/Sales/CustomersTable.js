import React from 'react';
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
} from '@mui/material';
import { salesData } from './constants';

const CustomersTable = ({ formatCurrency, formatDate }) => {
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
                <TableCell>Customer ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Credit Limit</TableCell>
                <TableCell>Current Balance</TableCell>
                <TableCell>Lifetime Value</TableCell>
                <TableCell>Last Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.customers.map((customer) => (
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
