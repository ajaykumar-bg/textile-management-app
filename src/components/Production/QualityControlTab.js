import React from 'react';
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
} from '@mui/material';
import { productionData } from './constants';

const QualityControlTab = ({ formatDate }) => {
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
                  <TableCell>Date</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Defects</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productionData.qualityMetrics.inspectionResults.map(
                  (result, index) => (
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
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default QualityControlTab;
