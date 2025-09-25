import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon, GetApp as ExportIcon } from '@mui/icons-material';

const InventoryHeader = ({ permissions, onAddItem, onExport }) => {
  return (
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
            onClick={onAddItem}
          >
            Add Item
          </Button>
          <Button
            variant='outlined'
            startIcon={<ExportIcon />}
            onClick={onExport}
          >
            Export
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default InventoryHeader;
