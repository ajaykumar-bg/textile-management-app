import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { designData } from './constants';

const CollectionsGrid = ({ onViewCollection }) => {
  return (
    <Grid container spacing={3}>
      {designData.collections.map((collection) => (
        <Grid size={{ xs: 12, md: 6 }} key={collection.id}>
          <Card elevation={2}>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='start'
                mb={2}
              >
                <Typography variant='h6'>{collection.name}</Typography>
                <Chip
                  label={collection.status}
                  color={
                    collection.status === 'In Development'
                      ? 'warning'
                      : 'default'
                  }
                  size='small'
                />
              </Box>

              <Typography variant='body2' color='text.secondary' gutterBottom>
                {collection.season} • {collection.theme}
              </Typography>

              <Typography variant='body2' mb={2}>
                {collection.description}
              </Typography>

              <Box display='flex' justifyContent='space-between' mb={2}>
                <Typography variant='body2'>
                  <strong>Designs:</strong> {collection.designCount}
                </Typography>
                <Typography variant='body2'>
                  <strong>Launch:</strong>{' '}
                  {new Date(collection.targetLaunch).toLocaleDateString()}
                </Typography>
              </Box>

              <Button
                variant='outlined'
                fullWidth
                onClick={() => onViewCollection(collection)}
              >
                View Collection
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionsGrid;
