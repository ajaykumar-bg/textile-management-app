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

const ReceivablesTable = ({
  accountingData,
  formatCurrency,
  formatDate,
  paymentStatuses,
}) => {
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
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Invoice Number</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Days Overdue</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountingData.receivables.map((receivable) => (
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
