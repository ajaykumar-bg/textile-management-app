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
import { productionData, machineStatusColors } from './constants';

const MachinesTable = ({ formatDate }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedMachines = useMemo(() => {
    return [...productionData.machines].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'efficiency') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle date values
      if (orderBy === 'nextMaintenance') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string values
      if (typeof aValue === 'string' && orderBy !== 'nextMaintenance') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Handle null/undefined values
      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;

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
          Machine Status
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
                    Machine ID
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
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={createSortHandler('type')}
                  >
                    Type
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
                    active={orderBy === 'currentJob'}
                    direction={orderBy === 'currentJob' ? order : 'asc'}
                    onClick={createSortHandler('currentJob')}
                  >
                    Current Job
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
                    active={orderBy === 'efficiency'}
                    direction={orderBy === 'efficiency' ? order : 'asc'}
                    onClick={createSortHandler('efficiency')}
                  >
                    Efficiency
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'nextMaintenance'}
                    direction={orderBy === 'nextMaintenance' ? order : 'asc'}
                    onClick={createSortHandler('nextMaintenance')}
                  >
                    Next Maintenance
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMachines.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {machine.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>{machine.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={machine.status}
                      color={machineStatusColors[machine.status] || 'default'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>{machine.currentJob || 'None'}</TableCell>
                  <TableCell>{machine.operator}</TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {machine.efficiency}%
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(machine.nextMaintenance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MachinesTable;
