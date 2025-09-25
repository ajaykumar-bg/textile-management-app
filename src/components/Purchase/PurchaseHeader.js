import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon, GetApp as ExportIcon } from '@mui/icons-material';

const PurchaseHeader = ({ permissions, onAddPurchaseOrder, onExport }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
    >
      <Box>
        <Typography variant='h4' gutterBottom>
          Purchase Management
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Manage purchase orders, suppliers, requisitions and procurement
          processes
        </Typography>
      </Box>
      {permissions.canManageInventory && (
        <Box display='flex' gap={2}>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={onAddPurchaseOrder}
          >
            New PO
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

export default PurchaseHeader;
