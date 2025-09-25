import React from 'react';
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
  Chip,
} from '@mui/material';

const PayablesTable = ({
  accountingData,
  formatCurrency,
  formatDate,
  paymentStatuses,
}) => {
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
                <TableCell>ID</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Invoice Number</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Days Overdue</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountingData.payables.map((payable) => (
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
