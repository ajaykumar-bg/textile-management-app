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
import { purchaseData } from './constants';

const SuppliersTable = ({ formatDate, formatCurrency }) => {
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
                <TableCell>Supplier</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Credit Limit</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Last Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseData.suppliers.map((supplier) => (
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
