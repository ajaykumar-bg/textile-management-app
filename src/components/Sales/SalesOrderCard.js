import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import {
  salesStatusColors,
  paymentStatusColors,
  priorityColors,
} from './constants';

const SalesOrderCard = ({
  order,
  onEdit,
  onDelete,
  onViewDetails,
  onConvert,
  showActions = true,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card elevation={2} sx={{ height: '100%', position: 'relative' }}>
      <CardContent>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={2}
        >
          <Box>
            <Typography variant='h6' component='div' fontWeight='bold'>
              {order.id}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {formatDate(order.orderDate)}
            </Typography>
          </Box>
          {showActions && (
            <IconButton size='small' onClick={handleMenuOpen}>
              <MoreIcon />
            </IconButton>
          )}
        </Box>

        <Box display='flex' alignItems='center' mb={2}>
          <PersonIcon
            fontSize='small'
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          <Box>
            <Typography variant='body2' fontWeight='medium'>
              {order.customerName}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {order.customerContact}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2' color='text.secondary'>
                Status
              </Typography>
              <Chip
                label={order.status}
                color={salesStatusColors[order.status] || 'default'}
                size='small'
                sx={{ mt: 0.5, width: 'fit-content' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2' color='text.secondary'>
                Priority
              </Typography>
              <Chip
                label={order.priority}
                color={priorityColors[order.priority] || 'default'}
                size='small'
                sx={{ mt: 0.5, width: 'fit-content' }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box display='flex' alignItems='center' mb={2}>
          <CalendarIcon
            fontSize='small'
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Delivery Date
            </Typography>
            <Typography variant='body2' fontWeight='medium'>
              {formatDate(order.deliveryDate)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Box display='flex' alignItems='center'>
            <MoneyIcon
              fontSize='small'
              sx={{ mr: 1, color: 'text.secondary' }}
            />
            <Box>
              <Typography variant='body2' color='text.secondary'>
                Total Amount
              </Typography>
              <Typography variant='h6' fontWeight='bold' color='success.main'>
                {formatCurrency(order.totalAmount)}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={order.paymentStatus}
            color={paymentStatusColors[order.paymentStatus] || 'default'}
            size='small'
            variant='outlined'
          />
        </Box>

        <Box display='flex' alignItems='center' mb={2}>
          <ShippingIcon
            fontSize='small'
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Items & Payment
            </Typography>
            <Typography variant='body2'>
              {order.items?.length || 0} items • {order.paymentMethod}
            </Typography>
          </Box>
        </Box>

        {order.status === 'Draft' && showActions && (
          <Box mt={2}>
            <Button
              variant='contained'
              size='small'
              fullWidth
              onClick={() => onConvert?.(order)}
            >
              Convert to Order
            </Button>
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              onViewDetails?.(order);
              handleMenuClose();
            }}
          >
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              onEdit?.(order);
              handleMenuClose();
            }}
          >
            Edit Order
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('Print order');
              handleMenuClose();
            }}
          >
            Print Order
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              onDelete?.(order);
              handleMenuClose();
            }}
          >
            Delete Order
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default SalesOrderCard;
