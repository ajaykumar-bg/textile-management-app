import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Palette as PaletteIcon,
  Collections as CollectionsIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import DesignCard from './DesignCard';
import DesignOverview from './DesignOverview';
import { designData, designCategories, designStatusColors } from './constants';

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
            Design Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Manage fabric designs, patterns, collections and color palettes
          </Typography>
        </Box>
        {permissions.canManageInventory && (
          <Box display='flex' gap={2}>
            <Button
              variant='outlined'
              startIcon={<PaletteIcon />}
              onClick={() => setColorPaletteDialog(true)}
            >
              Color Palettes
            </Button>
            <Button variant='outlined' startIcon={<CollectionsIcon />}>
              Collections
            </Button>
            <Button variant='contained' startIcon={<AddIcon />}>
              New Design
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
          <Tab label='Designs' />
          <Tab label='Patterns' />
          <Tab label='Collections' />
        </Tabs>
      </Card>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <DesignOverview />
      </TabPanel>

      {/* Designs Tab */}
      <TabPanel value={tabValue} index={1}>
        {/* Filters */}
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
                    startAdornment: (
                      <SearchIcon color='action' sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
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
                  Showing {filteredDesigns.length} of{' '}
                  {designData.designs.length} designs
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Design Cards */}
        <Grid container spacing={3}>
          {filteredDesigns.map((design) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} lg={3} key={design.id}>
              <DesignCard
                design={design}
                onView={(design) => console.log('View:', design)}
                onEdit={(design) => console.log('Edit:', design)}
                onCopy={(design) => console.log('Copy:', design)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Patterns Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Pattern Library
            </Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Pattern ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Repeat</TableCell>
                    <TableCell>Complexity</TableCell>
                    <TableCell>Variations</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {designData.patterns.map((pattern) => (
                    <TableRow key={pattern.id} hover>
                      <TableCell>{pattern.id}</TableCell>
                      <TableCell>
                        <Typography variant='body2' fontWeight='medium'>
                          {pattern.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={pattern.type}
                          variant='outlined'
                          size='small'
                        />
                      </TableCell>
                      <TableCell>{pattern.category}</TableCell>
                      <TableCell>{pattern.repeat}</TableCell>
                      <TableCell>
                        <Chip
                          label={pattern.complexity}
                          color={
                            pattern.complexity === 'Low'
                              ? 'success'
                              : pattern.complexity === 'Medium'
                              ? 'warning'
                              : 'error'
                          }
                          size='small'
                        />
                      </TableCell>
                      <TableCell>{pattern.variations?.length || 0}</TableCell>
                      <TableCell>
                        <Button size='small'>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Collections Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {designData.collections.map((collection) => (
            <Grid size={{ xs: 12, md: 6 }} key={collection.id}>
              <Card elevation={2}>
                <CardContent>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='start'
                    mb={2}
                  >
                    <Typography variant='h6'>{collection.name}</Typography>
                    <Chip
                      label={collection.status}
                      color={
                        collection.status === 'In Development'
                          ? 'warning'
                          : 'default'
                      }
                      size='small'
                    />
                  </Box>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    {collection.season} • {collection.theme}
                  </Typography>

                  <Typography variant='body2' mb={2}>
                    {collection.description}
                  </Typography>

                  <Box display='flex' justifyContent='space-between' mb={2}>
                    <Typography variant='body2'>
                      <strong>Designs:</strong> {collection.designCount}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Launch:</strong>{' '}
                      {new Date(collection.targetLaunch).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Button variant='outlined' fullWidth>
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Color Palette Dialog */}
      <Dialog
        open={colorPaletteDialog}
        onClose={() => setColorPaletteDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Color Palettes</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {designData.colorPalettes.map((palette) => (
              <Grid size={{ xs: 12, md: 6 }} key={palette.id}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      {palette.name}
                    </Typography>

                    <Box display='flex' gap={1} mb={2}>
                      {palette.colors.map((color, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: color.hex,
                            borderRadius: 1,
                            border: '1px solid rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                          }}
                          title={`${color.name} (${color.hex})`}
                        />
                      ))}
                    </Box>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      gutterBottom
                    >
                      {palette.season} • {palette.mood}
                    </Typography>

                    <Box mt={2}>
                      {palette.colors.map((color, index) => (
                        <Box
                          key={index}
                          display='flex'
                          justifyContent='space-between'
                          mb={0.5}
                        >
                          <Typography variant='caption'>
                            {color.name}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {color.pantone}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setColorPaletteDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Design;
