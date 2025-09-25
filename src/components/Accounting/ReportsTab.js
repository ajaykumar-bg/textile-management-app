import React from 'react';
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
  LinearProgress,
} from '@mui/material';

const ReportsTab = ({ accountingData, formatCurrency }) => {
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
                    <TableCell>Category</TableCell>
                    <TableCell align='right'>Budget</TableCell>
                    <TableCell align='right'>Actual</TableCell>
                    <TableCell align='right'>Variance</TableCell>
                    <TableCell>Variance %</TableCell>
                    <TableCell>Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountingData.budgetVsActual.map((item, index) => (
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

export default ReportsTab;
