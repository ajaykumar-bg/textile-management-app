import React from 'react';
import { Box } from '@mui/material';

const TabPanel = ({ children, value, index }) => (
  <div role='tabpanel' hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

export default TabPanel;
