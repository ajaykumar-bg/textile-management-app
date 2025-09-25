import React from 'react';
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
} from '@mui/material';
import { salesData } from './constants';

const QuotationsTable = ({
  permissions,
  onConvertQuote,
  formatDate,
  formatCurrency,
}) => {
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
                <TableCell>Quote ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Quote Date</TableCell>
                <TableCell>Valid Until</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.quotations.map((quote) => (
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
