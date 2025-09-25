import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  Add as AddIcon,
  GetApp as ExportIcon,
  Receipt as QuoteIcon,
} from '@mui/icons-material';

const SalesHeader = ({ permissions, onAddOrder, onAddQuote, onExport }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
    >
      <Box>
        <Typography variant='h4' gutterBottom>
          Sales Management
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Manage sales orders, quotations, customer relationships and track
          performance
        </Typography>
      </Box>
      {permissions.canManageOrders && (
        <Box display='flex' gap={2}>
          <Button
            variant='outlined'
            startIcon={<QuoteIcon />}
            onClick={onAddQuote}
          >
            New Quote
          </Button>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={onAddOrder}
          >
            New Order
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

export default SalesHeader;
