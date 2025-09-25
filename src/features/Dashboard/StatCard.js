import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, trend, subtitle }) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <Box>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {title}
          </Typography>
          <Typography
            variant='h4'
            fontWeight='bold'
            color={color || 'primary.main'}
          >
            {typeof value === 'number' && value > 1000
              ? `${(value / 1000).toFixed(1)}k`
              : value}
          </Typography>
          {subtitle && (
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
          {trend && (
            <Box display='flex' alignItems='center' sx={{ mt: 1 }}>
              <TrendingUp fontSize='small' color='success' />
              <Typography variant='body2' color='success.main' sx={{ ml: 0.5 }}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Avatar
          sx={{ bgcolor: color || 'primary.main', width: 56, height: 56 }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
