import React from 'react';
import { Box, Typography } from '@mui/material';

function RoleAccessLimitInfo() {
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        bgcolor: 'action.hover',
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant='caption' color='text.secondary'>
        <strong>Legend:</strong> ✓ = Full Access • ◐ = View Only • ✗ = No Access
      </Typography>
    </Box>
  );
}

export default RoleAccessLimitInfo;
