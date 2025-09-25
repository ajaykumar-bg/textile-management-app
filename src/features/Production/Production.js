import React, { useState } from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';
import { useUser } from '../../context/UserContext';
import ProductionHeader from './ProductionHeader';
import ProductionOrdersTable from './ProductionOrdersTable';
import MachinesTable from './MachinesTable';
import QualityControlTab from './QualityControlTab';
import PerformanceTab from './PerformanceTab';
import TabPanel from './TabPanel';

const Production = () => {
  const { permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddProductionOrder = () => {
    console.log('Add new production order');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <ProductionHeader
        permissions={permissions}
        onAddProductionOrder={handleAddProductionOrder}
      />

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

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <ProductionOrdersTable formatDate={formatDate} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <MachinesTable formatDate={formatDate} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <QualityControlTab formatDate={formatDate} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <PerformanceTab />
      </TabPanel>
    </Box>
  );
};

export default Production;
