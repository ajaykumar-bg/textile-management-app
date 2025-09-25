import React, { useState, useMemo } from 'react';
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
  TableSortLabel,
} from '@mui/material';
import { statusColors } from './constants';

const InventoryTable = ({
  filteredItems,
  onViewDetails,
  onEditItem,
  permissions,
}) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (
        orderBy === 'currentStock' ||
        orderBy === 'unitPrice' ||
        orderBy === 'totalValue'
      ) {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle string values
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredItems, orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={createSortHandler('id')}
              >
                Item Code
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={createSortHandler('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderBy === 'category' ? order : 'asc'}
                onClick={createSortHandler('category')}
              >
                Category
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'currentStock'}
                direction={orderBy === 'currentStock' ? order : 'asc'}
                onClick={createSortHandler('currentStock')}
              >
                Current Stock
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
                active={orderBy === 'unitPrice'}
                direction={orderBy === 'unitPrice' ? order : 'asc'}
                onClick={createSortHandler('unitPrice')}
              >
                Unit Price
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'totalValue'}
                direction={orderBy === 'totalValue' ? order : 'asc'}
                onClick={createSortHandler('totalValue')}
              >
                Total Value
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'location'}
                direction={orderBy === 'location' ? order : 'asc'}
                onClick={createSortHandler('location')}
              >
                Location
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.map((item) => (
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
