import React from 'react';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import { roleAccessDetails } from './role.constants';

const RoleDetails = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Access Details
        </Typography>
        <Grid container spacing={3}>
          {roleAccessDetails.map((role) => (
            <Grid size={{ xs: 12, md: 4 }} key={role.name}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: role.bgColor,
                  borderLeft: '4px solid',
                  borderColor: role.borderColor,
                }}
              >
                <Typography
                  variant='subtitle1'
                  fontWeight='bold'
                  color={role.textColor}
                  gutterBottom
                >
                  {role.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {role.features.map((feature, index) => (
                    <React.Fragment key={index}>
                      • {feature}
                      {index < role.features.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RoleDetails;
