import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { designStatusColors } from './constants';

const DesignCard = ({ design, onEdit, onView, onCopy }) => {
  return (
    <Card
      elevation={2}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component='div'
        sx={{
          height: 200,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Placeholder for design thumbnail */}
        <Typography variant='h6' color='text.secondary'>
          {design.name}
        </Typography>

        {/* Color palette preview */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            display: 'flex',
            gap: 0.5,
          }}
        >
          {design.colors?.slice(0, 4).map((color, index) => (
            <Box
              key={index}
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: color,
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            />
          ))}
          {design.colors?.length > 4 && (
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ ml: 0.5 }}
            >
              +{design.colors.length - 4}
            </Typography>
          )}
        </Box>
      </CardMedia>

      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={1}
        >
          <Typography variant='h6' component='h3' noWrap>
            {design.name}
          </Typography>
          <Chip
            label={design.status}
            color={designStatusColors[design.status] || 'default'}
            size='small'
          />
        </Box>

        <Typography variant='body2' color='text.secondary' gutterBottom>
          ID: {design.id}
        </Typography>

        <Box display='flex' gap={1} mb={1} flexWrap='wrap'>
          <Chip label={design.category} variant='outlined' size='small' />
          <Chip label={design.type} variant='outlined' size='small' />
        </Box>

        <Typography variant='body2' color='text.secondary' mb={1}>
          Designer: {design.designer}
        </Typography>

        <Typography variant='body2' color='text.secondary' mb={1}>
          Repeat: {design.repeat}
        </Typography>

        <Typography variant='body2' color='text.secondary' mb={2}>
          {design.colorways} colorways • {design.dpi} DPI
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {design.description}
        </Typography>

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mt={2}
        >
          <Typography variant='caption' color='text.secondary'>
            Modified: {new Date(design.lastModified).toLocaleDateString()}
          </Typography>

          <Box>
            <Tooltip title='View Details'>
              <IconButton size='small' onClick={() => onView?.(design)}>
                <ViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Design'>
              <IconButton size='small' onClick={() => onEdit?.(design)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Copy Design'>
              <IconButton size='small' onClick={() => onCopy?.(design)}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DesignCard;
