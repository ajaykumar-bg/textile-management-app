import React, { useState } from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';
import { useUser } from '../../context/UserContext';
import StockOverview from './StockOverview';
import InventoryHeader from './InventoryHeader';
import InventoryFilters from './InventoryFilters';
import InventoryTable from './InventoryTable';
import InventoryGrid from './InventoryGrid';
import StockMovements from './StockMovements';
import TabPanel from './TabPanel';
import { inventoryData } from './constants';

const Inventory = () => {
  const { user, permissions } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  // Combine all inventory items
  const allItems = [...inventoryData.fabrics, ...inventoryData.products];

  // Filter items based on search and filters
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddItem = () => {
    console.log('Add new item');
  };

  const handleEditItem = (item) => {
    console.log('Edit item:', item.id);
  };

  const handleDeleteItem = (item) => {
    console.log('Delete item:', item.id);
  };

  const handleViewDetails = (item) => {
    console.log('View details:', item.id);
  };

  const handleExport = () => {
    console.log('Export inventory data');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <InventoryHeader
        permissions={permissions}
        onAddItem={handleAddItem}
        onExport={handleExport}
      />

      {/* Tabs */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Overview' />
          <Tab label='Inventory Items' />
          <Tab label='Stock Movements' />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <StockOverview userRole={user.role} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Filters */}
        <InventoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredItemsCount={filteredItems.length}
          allItems={allItems}
        />

        {/* Inventory Items */}
        {viewMode === 'cards' ? (
          <InventoryGrid
            filteredItems={filteredItems}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onViewDetails={handleViewDetails}
            permissions={permissions}
          />
        ) : (
          <InventoryTable
            filteredItems={filteredItems}
            onViewDetails={handleViewDetails}
            onEditItem={handleEditItem}
            permissions={permissions}
          />
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <StockMovements />
      </TabPanel>
    </Box>
  );
};

export default Inventory;
