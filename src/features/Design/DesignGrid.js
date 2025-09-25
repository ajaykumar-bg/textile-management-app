import React from 'react';
import { Grid } from '@mui/material';
import DesignCard from './DesignCard';

const DesignGrid = ({ designs, onView, onEdit, onCopy }) => {
  return (
    <Grid container spacing={3}>
      {designs.map((design) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={design.id}>
          <DesignCard
            design={design}
            onView={onView}
            onEdit={onEdit}
            onCopy={onCopy}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DesignGrid;
