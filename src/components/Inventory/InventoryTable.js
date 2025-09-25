import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { statusColors } from './constants';

const InventoryTable = ({
  filteredItems,
  onViewDetails,
  onEditItem,
  permissions,
}) => {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Item Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total Value</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  {item.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{item.name}</Typography>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  {item.currentStock} {item.unit}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={item.status}
                  color={statusColors[item.status] || 'default'}
                  size='small'
                />
              </TableCell>
              <TableCell>${item.unitPrice}</TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  ${item.totalValue.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <Box display='flex' gap={1}>
                  <Button size='small' onClick={() => onViewDetails(item)}>
                    View
                  </Button>
                  {permissions.canManageInventory && (
                    <Button size='small' onClick={() => onEditItem(item)}>
                      Edit
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
