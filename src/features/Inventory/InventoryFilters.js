import React from 'react';
import {
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const InventoryFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  filteredItemsCount,
  allItems,
}) => {
  const getUniqueCategories = () => {
    const categories = [...new Set(allItems.map((item) => item.category))];
    return categories.sort();
  };

  const getUniqueStatuses = () => {
    const statuses = [...new Set(allItems.map((item) => item.status))];
    return statuses.sort();
  };

  return (
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
              {filteredItemsCount} items found
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InventoryFilters;
