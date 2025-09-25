import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { designData } from './constants';

const ColorPaletteDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Color Palettes</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {designData.colorPalettes.map((palette) => (
            <Grid size={{ xs: 12, md: 6 }} key={palette.id}>
              <Card variant='outlined'>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {palette.name}
                  </Typography>

                  <Box display='flex' gap={1} mb={2}>
                    {palette.colors.map((color, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: color.hex,
                          borderRadius: 1,
                          border: '1px solid rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                        }}
                        title={`${color.name} (${color.hex})`}
                      />
                    ))}
                  </Box>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    {palette.season} • {palette.mood}
                  </Typography>

                  <Box mt={2}>
                    {palette.colors.map((color, index) => (
                      <Box
                        key={index}
                        display='flex'
                        justifyContent='space-between'
                        mb={0.5}
                      >
                        <Typography variant='caption'>{color.name}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {color.pantone}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPaletteDialog;
