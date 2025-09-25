import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ProductionHeader = ({ permissions, onAddProductionOrder }) => {
  return (
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
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={onAddProductionOrder}
          >
            New Production Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductionHeader;
