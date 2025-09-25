import React, { useState, useMemo } from 'react';
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
  LinearProgress,
  TableSortLabel,
} from '@mui/material';
import { PlayArrow as StartIcon, Stop as StopIcon } from '@mui/icons-material';
import { productionData, productionStatusColors } from './constants';

const ProductionOrdersTable = ({ formatDate }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('desc'); // Default to desc to show newest first

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedOrders = useMemo(() => {
    return [...productionData.orders].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'orderQty' || orderBy === 'producedQty') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle progress calculation for sorting
      if (orderBy === 'progress') {
        aValue = (a.producedQty / a.orderQty) * 100;
        bValue = (b.producedQty / b.orderQty) * 100;
      }

      // Handle date values
      if (orderBy === 'plannedEndDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (typeof aValue === 'string' && orderBy !== 'plannedEndDate') {
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

  const handleStartStop = (order) => {
    if (order.status === 'In Progress') {
      console.log('Stop production order:', order.id);
    } else {
      console.log('Start production order:', order.id);
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Active Production Orders
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
                    Order ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'productName'}
                    direction={orderBy === 'productName' ? order : 'asc'}
                    onClick={createSortHandler('productName')}
                  >
                    Product
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'progress'}
                    direction={orderBy === 'progress' ? order : 'asc'}
                    onClick={createSortHandler('progress')}
                  >
                    Progress
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={createSortHandler('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'machine'}
                    direction={orderBy === 'machine' ? order : 'asc'}
                    onClick={createSortHandler('machine')}
                  >
                    Machine
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'operator'}
                    direction={orderBy === 'operator' ? order : 'asc'}
                    onClick={createSortHandler('operator')}
                  >
                    Operator
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'plannedEndDate'}
                    direction={orderBy === 'plannedEndDate' ? order : 'asc'}
                    onClick={createSortHandler('plannedEndDate')}
                  >
                    Planned End
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{order.productName}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {order.orderQty} units
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: 100 }}>
                      <LinearProgress
                        variant='determinate'
                        value={(order.producedQty / order.orderQty) * 100}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant='caption'>
                        {order.producedQty}/{order.orderQty}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={productionStatusColors[order.status] || 'default'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>{order.machine}</TableCell>
                  <TableCell>{order.operator}</TableCell>
                  <TableCell>{formatDate(order.plannedEndDate)}</TableCell>
                  <TableCell>
                    <Box display='flex' gap={1}>
                      {order.status === 'In Progress' ? (
                        <Button
                          size='small'
                          startIcon={<StopIcon />}
                          onClick={() => handleStartStop(order)}
                        >
                          Stop
                        </Button>
                      ) : (
                        <Button
                          size='small'
                          startIcon={<StartIcon />}
                          onClick={() => handleStartStop(order)}
                        >
                          Start
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

export default ProductionOrdersTable;
