import React from 'react';
import { Grid } from '@mui/material';
import InventoryCard from './InventoryCard';

const InventoryGrid = ({
  filteredItems,
  onEditItem,
  onDeleteItem,
  onViewDetails,
  permissions,
}) => {
  return (
    <Grid container spacing={3}>
      {filteredItems.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
          <InventoryCard
            item={item}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
            onViewDetails={onViewDetails}
            showActions={permissions.canManageInventory}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoryGrid;
