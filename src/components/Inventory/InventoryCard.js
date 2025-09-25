import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const InventoryCard = ({
  item,
  onEdit,
  onDelete,
  onViewDetails,
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStockPercentage = () => {
    return (item.currentStock / item.maxStock) * 100;
  };

  const getStatusIcon = () => {
    if (item.status === 'In Stock') return <CheckIcon fontSize='small' />;
    if (item.status === 'Low Stock') return <WarningIcon fontSize='small' />;
    return <InventoryIcon fontSize='small' />;
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
            <Typography variant='h6' component='div' noWrap>
              {item.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.id}
            </Typography>
          </Box>
          {showActions && (
            <IconButton size='small' onClick={handleMenuOpen}>
              <MoreIcon />
            </IconButton>
          )}
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary'>
              Category
            </Typography>
            <Typography variant='body1' fontWeight='medium'>
              {item.category}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='text.secondary'>
              Location
            </Typography>
            <Typography variant='body1' fontWeight='medium'>
              {item.location}
            </Typography>
          </Grid>
        </Grid>

        <Box mb={2}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={1}
          >
            <Typography variant='body2' color='text.secondary'>
              Stock Level
            </Typography>
            <Chip
              icon={getStatusIcon()}
              label={item.status}
              color={getStatusColor(item.status)}
              size='small'
              variant='filled'
            />
          </Box>
          <Typography
            variant='h5'
            fontWeight='bold'
            color='primary.main'
            mb={1}
          >
            {item.currentStock} {item.unit}
          </Typography>
          <LinearProgress
            variant='determinate'
            value={getStockPercentage()}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
            }}
            color={item.currentStock < item.minStock ? 'error' : 'success'}
          />
          <Typography variant='caption' color='text.secondary' mt={1}>
            Min: {item.minStock} | Max: {item.maxStock}
          </Typography>
        </Box>

        <Box>
          <Typography variant='body2' color='text.secondary'>
            Total Value
          </Typography>
          <Typography variant='h6' fontWeight='bold' color='success.main'>
            ${item.totalValue.toLocaleString()}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            @ ${item.unitPrice}/{item.unit}
          </Typography>
        </Box>

        {item.supplier && (
          <Box mt={2}>
            <Typography variant='body2' color='text.secondary'>
              Supplier
            </Typography>
            <Typography variant='body2' fontWeight='medium'>
              {item.supplier}
            </Typography>
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
              onViewDetails?.(item);
              handleMenuClose();
            }}
          >
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              onEdit?.(item);
              handleMenuClose();
            }}
          >
            Edit Item
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete?.(item);
              handleMenuClose();
            }}
          >
            Delete Item
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default InventoryCard;
