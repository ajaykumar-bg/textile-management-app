import React from 'react';
import { Grid } from '@mui/material';
import SalesOrderCard from './SalesOrderCard';

const SalesOrdersGrid = ({
  orders,
  permissions,
  onEditOrder,
  onDeleteOrder,
  onViewDetails,
  onConvertQuote,
}) => {
  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={order.id}>
          <SalesOrderCard
            order={order}
            onEdit={onEditOrder}
            onDelete={onDeleteOrder}
            onViewDetails={onViewDetails}
            onConvert={onConvertQuote}
            showActions={permissions.canManageOrders}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SalesOrdersGrid;
