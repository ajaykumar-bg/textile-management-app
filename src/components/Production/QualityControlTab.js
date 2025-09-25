import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Grid,
  TableSortLabel,
} from '@mui/material';
import { productionData } from './constants';

const QualityControlTab = ({ formatDate }) => {
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc'); // Default to desc to show newest first

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedInspections = useMemo(() => {
    return [...productionData.qualityMetrics.inspectionResults].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle numeric values
      if (orderBy === 'defects') {
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
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Quality Metrics
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary'>
                Overall Defect Rate
              </Typography>
              <Typography variant='h4' color='error.main'>
                {productionData.qualityMetrics.overallDefectRate}%
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary'>
                First Pass Yield
              </Typography>
              <Typography variant='h4' color='success.main'>
                {productionData.qualityMetrics.firstPassYield}%
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='body2' color='text.secondary'>
                Quality Score
              </Typography>
              <Typography variant='h4' color='primary.main'>
                {productionData.qualityMetrics.qualityScore}/5
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Recent Inspections
            </Typography>
            <Table size='small'>
              <TableHead>
                <TableRow>
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
                      active={orderBy === 'batch'}
                      direction={orderBy === 'batch' ? order : 'asc'}
                      onClick={createSortHandler('batch')}
                    >
                      Batch
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'result'}
                      direction={orderBy === 'result' ? order : 'asc'}
                      onClick={createSortHandler('result')}
                    >
                      Result
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'defects'}
                      direction={orderBy === 'defects' ? order : 'asc'}
                      onClick={createSortHandler('defects')}
                    >
                      Defects
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedInspections.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(result.date)}</TableCell>
                    <TableCell>{result.batch}</TableCell>
                    <TableCell>
                      <Chip
                        label={result.result}
                        color={result.result === 'Pass' ? 'success' : 'error'}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>{result.defects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default QualityControlTab;
