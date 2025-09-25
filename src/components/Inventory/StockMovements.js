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
import { inventoryData } from './constants';

const StockMovements = () => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Recent Stock Movements
        </Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Movement ID</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.movements.map((movement) => (
                <TableRow key={movement.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {movement.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{movement.itemName}</TableCell>
                  <TableCell>
                    <Chip
                      label={movement.type}
                      color={
                        movement.type === 'Inbound'
                          ? 'success'
                          : movement.type === 'Outbound'
                          ? 'error'
                          : 'info'
                      }
                      size='small'
                    />
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell>{movement.reference}</TableCell>
                  <TableCell>{movement.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default StockMovements;
