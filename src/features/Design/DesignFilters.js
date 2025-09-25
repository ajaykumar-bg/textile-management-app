import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { designCategories, designStatusColors } from './constants';

const DesignFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  filteredCount,
  totalCount,
}) => {
  return (
    <Card elevation={1} sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              placeholder='Search designs, designers, or IDs...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color='action' sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label='Category'
              >
                <MenuItem value=''>All Categories</MenuItem>
                {designCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 3, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label='Status'
              >
                <MenuItem value=''>All Status</MenuItem>
                {Object.keys(designStatusColors).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Typography variant='body2' color='text.secondary'>
              Showing {filteredCount} of {totalCount} designs
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DesignFilters;
