import React from 'react';
import { Box } from '@mui/material';

const CompanyLogo = () => {
  return (
    <Box
      component='img'
      src={`${process.env.PUBLIC_URL}/triti-logo.jpeg`}
      alt='Triti Logo'
      sx={{ height: 40, ml: 2 }}
      onError={(e) => {
        console.log('Logo failed to load:', e.target.src);
        e.target.style.display = 'none';
      }}
    />
  );
};

export default CompanyLogo;
