import React from 'react';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const OrderDetailsDialog = ({
  open,
  onClose,
  selectedOrder,
  permissions,
  onEditOrder,
  formatDate,
  formatCurrency,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
      <DialogContent>
        {selectedOrder && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2'>Customer Information</Typography>
              <Typography variant='body2'>
                {selectedOrder.customerName}
              </Typography>
              <Typography variant='body2'>
                {selectedOrder.customerContact}
              </Typography>
              <Typography variant='body2'>
                {selectedOrder.customerEmail}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant='subtitle2'>Order Information</Typography>
              <Typography variant='body2'>
                Order Date: {formatDate(selectedOrder.orderDate)}
              </Typography>
              <Typography variant='body2'>
                Delivery Date: {formatDate(selectedOrder.deliveryDate)}
              </Typography>
              <Typography variant='body2'>
                Status: {selectedOrder.status}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
                Order Items
              </Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {permissions.canManageOrders && (
          <Button
            variant='contained'
            onClick={() => onEditOrder(selectedOrder)}
          >
            Edit Order
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
