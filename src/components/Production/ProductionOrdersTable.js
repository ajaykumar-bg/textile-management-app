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
  LinearProgress,
} from '@mui/material';
import { PlayArrow as StartIcon, Stop as StopIcon } from '@mui/icons-material';
import { productionData, productionStatusColors } from './constants';

const ProductionOrdersTable = ({ formatDate }) => {
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
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Machine</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>Planned End</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productionData.orders.map((order) => (
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
