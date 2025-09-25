import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  Add as AddIcon,
  AccountBalance as AccountIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const AccountingHeader = ({ permissions }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
    >
      <Box>
        <Typography variant='h4' gutterBottom>
          Accounting & Finance
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Financial management, reporting and analysis
        </Typography>
      </Box>
      {permissions.canManageInventory && (
        <Box display='flex' gap={2}>
          <Button variant='outlined' startIcon={<AccountIcon />}>
            Chart of Accounts
          </Button>
          <Button variant='outlined' startIcon={<ReceiptIcon />}>
            New Transaction
          </Button>
          <Button variant='contained' startIcon={<AddIcon />}>
            Financial Report
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccountingHeader;
