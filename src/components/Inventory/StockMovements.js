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
  Chip,
  TableSortLabel,
} from '@mui/material';
import { inventoryData } from './constants';

const StockMovements = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('desc'); // Default to desc to show newest first

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedMovements = useMemo(() => {
    return [...inventoryData.movements].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'quantity') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (typeof aValue === 'string' && orderBy !== 'date') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
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
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={createSortHandler('id')}
                  >
                    Movement ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'itemName'}
                    direction={orderBy === 'itemName' ? order : 'asc'}
                    onClick={createSortHandler('itemName')}
                  >
                    Item
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
                    active={orderBy === 'quantity'}
                    direction={orderBy === 'quantity' ? order : 'asc'}
                    onClick={createSortHandler('quantity')}
                  >
                    Quantity
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={createSortHandler('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'reference'}
                    direction={orderBy === 'reference' ? order : 'asc'}
                    onClick={createSortHandler('reference')}
                  >
                    Reference
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'reason'}
                    direction={orderBy === 'reason' ? order : 'asc'}
                    onClick={createSortHandler('reason')}
                  >
                    Reason
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMovements.map((movement) => (
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
