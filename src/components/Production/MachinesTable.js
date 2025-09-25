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
import { productionData, machineStatusColors } from './constants';

const MachinesTable = ({ formatDate }) => {
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
                <TableCell>Machine ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Current Job</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>Efficiency</TableCell>
                <TableCell>Next Maintenance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productionData.machines.map((machine) => (
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
