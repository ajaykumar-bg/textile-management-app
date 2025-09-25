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

const RequisitionsTable = ({ formatDate, formatCurrency }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Purchase Requisitions
        </Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>PR Number</TableCell>
                <TableCell>Requested By</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Required Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Estimated Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseData.requisitions.map((req) => (
                <TableRow key={req.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {req.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{req.requestedBy}</TableCell>
                  <TableCell>{req.department}</TableCell>
                  <TableCell>{formatDate(req.requestDate)}</TableCell>
                  <TableCell>{formatDate(req.requiredDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={req.status}
                      color={req.status === 'Approved' ? 'success' : 'warning'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {formatCurrency(req.totalEstimated)}
                    </Typography>
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

export default RequisitionsTable;
