import React, { useState } from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';
import { useUser } from '../../context/UserContext';
import DesignOverview from './DesignOverview';
import DesignHeader from './DesignHeader';
import DesignFilters from './DesignFilters';
import DesignGrid from './DesignGrid';
import PatternsTable from './PatternsTable';
import CollectionsGrid from './CollectionsGrid';
import ColorPaletteDialog from './ColorPaletteDialog';
import TabPanel from './TabPanel';
import { designData } from './constants';

const Design = () => {
  const { permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [colorPaletteDialog, setColorPaletteDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorPalettes = () => {
    setColorPaletteDialog(true);
  };

  const handleCollections = () => {
    setTabValue(3); // Navigate to collections tab
  };

  const handleNewDesign = () => {
    console.log('Create new design');
  };

  const handleViewDesign = (design) => {
    console.log('View:', design);
  };

  const handleEditDesign = (design) => {
    console.log('Edit:', design);
  };

  const handleCopyDesign = (design) => {
    console.log('Copy:', design);
  };

  const handleViewPattern = (pattern) => {
    console.log('View pattern:', pattern);
  };

  const handleViewCollection = (collection) => {
    console.log('View collection:', collection);
  };

  const filteredDesigns = designData.designs.filter((design) => {
    return (
      (searchTerm === '' ||
        design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === '' || design.category === categoryFilter) &&
      (statusFilter === '' || design.status === statusFilter)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <DesignHeader
        permissions={permissions}
        onColorPalettes={handleColorPalettes}
        onCollections={handleCollections}
        onNewDesign={handleNewDesign}
      />

      {/* Tabs */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Overview' />
          <Tab label='Designs' />
          <Tab label='Patterns' />
          <Tab label='Collections' />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <DesignOverview />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Filters */}
        <DesignFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCount={filteredDesigns.length}
          totalCount={designData.designs.length}
        />

        {/* Design Cards */}
        <DesignGrid
          designs={filteredDesigns}
          onView={handleViewDesign}
          onEdit={handleEditDesign}
          onCopy={handleCopyDesign}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <PatternsTable onViewPattern={handleViewPattern} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <CollectionsGrid onViewCollection={handleViewCollection} />
      </TabPanel>

      {/* Color Palette Dialog */}
      <ColorPaletteDialog
        open={colorPaletteDialog}
        onClose={() => setColorPaletteDialog(false)}
      />
    </Box>
  );
};

export default Design;
