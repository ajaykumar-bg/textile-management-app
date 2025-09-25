import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as StartIcon,
  Stop as StopIcon,
} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts';
import { useUser } from '../../context/UserContext';
import {
  productionData,
  productionStatusColors,
  machineStatusColors,
} from './constants';

const Production = () => {
  const { permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const TabPanel = ({ children, value, index }) => (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Box>
          <Typography variant='h4' gutterBottom>
            Production Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Monitor production orders, machine status, quality control and
            performance metrics
          </Typography>
        </Box>
        {permissions.canManageInventory && (
          <Box display='flex' gap={2}>
            <Button variant='contained' startIcon={<AddIcon />}>
              New Production Order
            </Button>
          </Box>
        )}
      </Box>

      {/* Tabs */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Production Orders' />
          <Tab label='Machines' />
          <Tab label='Quality Control' />
          <Tab label='Performance' />
        </Tabs>
      </Card>

      {/* Production Orders Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Active Production Orders
            </Typography>
            <TableContainer>
              <Table>
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
                        <Typography variant='body2'>
                          {order.productName}
                        </Typography>
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
                          color={
                            productionStatusColors[order.status] || 'default'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell>{order.machine}</TableCell>
                      <TableCell>{order.operator}</TableCell>
                      <TableCell>{formatDate(order.plannedEndDate)}</TableCell>
                      <TableCell>
                        <Box display='flex' gap={1}>
                          {order.status === 'In Progress' ? (
                            <Button size='small' startIcon={<StopIcon />}>
                              Stop
                            </Button>
                          ) : (
                            <Button size='small' startIcon={<StartIcon />}>
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
      </TabPanel>

      {/* Machines Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Machine Status
            </Typography>
            <TableContainer>
              <Table>
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
                          color={
                            machineStatusColors[machine.status] || 'default'
                          }
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
                      <TableCell>
                        {formatDate(machine.nextMaintenance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Quality Control Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
                              color={
                                result.result === 'Pass' ? 'success' : 'error'
                              }
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
      </TabPanel>

      {/* Performance Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Monthly Production Performance
                </Typography>
                <BarChart
                  width={800}
                  height={300}
                  series={[
                    {
                      data: productionData.performance.monthlyProduction.map(
                        (item) => item.produced
                      ),
                      label: 'Actual Production',
                      color: '#4caf50',
                    },
                    {
                      data: productionData.performance.monthlyProduction.map(
                        (item) => item.target
                      ),
                      label: 'Target',
                      color: '#2196f3',
                    },
                  ]}
                  xAxis={[
                    {
                      data: productionData.performance.monthlyProduction.map(
                        (item) => item.month
                      ),
                      scaleType: 'band',
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Production;
