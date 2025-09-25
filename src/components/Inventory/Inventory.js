import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  GetApp as ExportIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import StockOverview from './StockOverview';
import InventoryCard from './InventoryCard';
import { inventoryData, statusColors } from './constants';

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

  const getUniqueCategories = () => {
    const categories = [...new Set(allItems.map((item) => item.category))];
    return categories.sort();
  };

  const getUniqueStatuses = () => {
    const statuses = [...new Set(allItems.map((item) => item.status))];
    return statuses.sort();
  };

  const TabPanel = ({ children, value, index }) => (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  const renderTableView = () => (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total Value</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  {item.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{item.name}</Typography>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  {item.currentStock} {item.unit}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={item.status}
                  color={statusColors[item.status] || 'default'}
                  size='small'
                />
              </TableCell>
              <TableCell>${item.unitPrice}</TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight='medium'>
                  ${item.totalValue.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <Box display='flex' gap={1}>
                  <Button size='small' onClick={() => handleViewDetails(item)}>
                    View
                  </Button>
                  {permissions.canManageInventory && (
                    <Button size='small' onClick={() => handleEditItem(item)}>
                      Edit
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCardView = () => (
    <Grid container spacing={3}>
      {filteredItems.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
          <InventoryCard
            item={item}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onViewDetails={handleViewDetails}
            showActions={permissions.canManageInventory}
          />
        </Grid>
      ))}
    </Grid>
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
            Inventory Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Track and manage fabric inventory, stock levels, and warehouse
            operations
          </Typography>
        </Box>
        {permissions.canManageInventory && (
          <Box display='flex' gap={2}>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleAddItem}
            >
              Add Item
            </Button>
            <Button
              variant='outlined'
              startIcon={<ExportIcon />}
              onClick={handleExport}
            >
              Export
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
        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems='center'>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  placeholder='Search items...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label='Category'
                  >
                    <MenuItem value='all'>All Categories</MenuItem>
                    {getUniqueCategories().map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label='Status'
                  >
                    <MenuItem value='all'>All Status</MenuItem>
                    {getUniqueStatuses().map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box display='flex' gap={1}>
                  <Button
                    variant={viewMode === 'cards' ? 'contained' : 'outlined'}
                    size='small'
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'contained' : 'outlined'}
                    size='small'
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  {filteredItems.length} items found
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Inventory Items */}
        {viewMode === 'cards' ? renderCardView() : renderTableView()}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Stock Movements Table */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Recent Stock Movements
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Movement ID</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Reference</TableCell>
                    <TableCell>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryData.movements.map((movement) => (
                    <TableRow key={movement.id} hover>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {movement.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{movement.itemName}</TableCell>
                      <TableCell>
                        <Chip
                          label={movement.type}
                          color={
                            movement.type === 'Inbound'
                              ? 'success'
                              : movement.type === 'Outbound'
                              ? 'error'
                              : 'info'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell>{movement.quantity}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>{movement.reference}</TableCell>
                      <TableCell>{movement.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default Inventory;
