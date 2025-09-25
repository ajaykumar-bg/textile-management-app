import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  Add as AddIcon,
  Palette as PaletteIcon,
  Collections as CollectionsIcon,
} from '@mui/icons-material';

const DesignHeader = ({
  permissions,
  onColorPalettes,
  onCollections,
  onNewDesign,
}) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
    >
      <Box>
        <Typography variant='h4' gutterBottom>
          Design Management
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Manage fabric designs, patterns, collections and color palettes
        </Typography>
      </Box>
      {permissions.canManageInventory && (
        <Box display='flex' gap={2}>
          <Button
            variant='outlined'
            startIcon={<PaletteIcon />}
            onClick={onColorPalettes}
          >
            Color Palettes
          </Button>
          <Button
            variant='outlined'
            startIcon={<CollectionsIcon />}
            onClick={onCollections}
          >
            Collections
          </Button>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={onNewDesign}
          >
            New Design
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DesignHeader;
