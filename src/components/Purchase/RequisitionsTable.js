import React, { useState, useMemo } from 'react';
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
  TableSortLabel,
} from '@mui/material';
import { purchaseData } from './constants';

const RequisitionsTable = ({ formatDate, formatCurrency }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('desc'); // Default to desc to show newest first

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRequisitions = useMemo(() => {
    return [...purchaseData.requisitions].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'totalEstimated') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'requestDate' || orderBy === 'requiredDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (
        typeof aValue === 'string' &&
        !['requestDate', 'requiredDate'].includes(orderBy)
      ) {
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
          Purchase Requisitions
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
                    PR Number
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'requestedBy'}
                    direction={orderBy === 'requestedBy' ? order : 'asc'}
                    onClick={createSortHandler('requestedBy')}
                  >
                    Requested By
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'department'}
                    direction={orderBy === 'department' ? order : 'asc'}
                    onClick={createSortHandler('department')}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'requestDate'}
                    direction={orderBy === 'requestDate' ? order : 'asc'}
                    onClick={createSortHandler('requestDate')}
                  >
                    Request Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'requiredDate'}
                    direction={orderBy === 'requiredDate' ? order : 'asc'}
                    onClick={createSortHandler('requiredDate')}
                  >
                    Required Date
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
                    active={orderBy === 'totalEstimated'}
                    direction={orderBy === 'totalEstimated' ? order : 'asc'}
                    onClick={createSortHandler('totalEstimated')}
                  >
                    Estimated Amount
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRequisitions.map((req) => (
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
