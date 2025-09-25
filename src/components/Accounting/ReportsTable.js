import React, { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  LinearProgress,
} from '@mui/material';

const ReportsTable = ({ accountingData, formatCurrency }) => {
  const [orderBy, setOrderBy] = useState('category');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(property);
  };

  const sortedBudgetData = useMemo(() => {
    if (!accountingData?.budgetVsActual) return [];

    return [...accountingData.budgetVsActual].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle special cases
      if (
        orderBy === 'budget' ||
        orderBy === 'actual' ||
        orderBy === 'variance'
      ) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (orderBy === 'variancePercent') {
        aValue = a.variancePercent;
        bValue = b.variancePercent;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [accountingData?.budgetVsActual, orderBy, order]);
  return (
    <Grid container spacing={3}>
      {/* Budget vs Actual */}
      <Grid size={{ xs: 12 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Budget vs Actual Performance
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'category'}
                        direction={orderBy === 'category' ? order : 'asc'}
                        onClick={createSortHandler('category')}
                      >
                        Category
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='right'>
                      <TableSortLabel
                        active={orderBy === 'budget'}
                        direction={orderBy === 'budget' ? order : 'asc'}
                        onClick={createSortHandler('budget')}
                      >
                        Budget
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='right'>
                      <TableSortLabel
                        active={orderBy === 'actual'}
                        direction={orderBy === 'actual' ? order : 'asc'}
                        onClick={createSortHandler('actual')}
                      >
                        Actual
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='right'>
                      <TableSortLabel
                        active={orderBy === 'variance'}
                        direction={orderBy === 'variance' ? order : 'asc'}
                        onClick={createSortHandler('variance')}
                      >
                        Variance
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'variancePercent'}
                        direction={
                          orderBy === 'variancePercent' ? order : 'asc'
                        }
                        onClick={createSortHandler('variancePercent')}
                      >
                        Variance %
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedBudgetData.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {item.category}
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        {formatCurrency(item.budget)}
                      </TableCell>
                      <TableCell align='right'>
                        {formatCurrency(item.actual)}
                      </TableCell>
                      <TableCell align='right'>
                        <Typography
                          variant='body2'
                          color={
                            item.variance >= 0 ? 'error.main' : 'success.main'
                          }
                        >
                          {formatCurrency(item.variance)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          color={
                            item.variancePercent >= 0
                              ? 'error.main'
                              : 'success.main'
                          }
                        >
                          {item.variancePercent.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant='determinate'
                          value={Math.min(
                            100,
                            (item.actual / item.budget) * 100
                          )}
                          color={item.variance <= 0 ? 'success' : 'error'}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ReportsTable;
