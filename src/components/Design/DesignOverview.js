import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
} from '@mui/material';
import { PieChart } from '@mui/x-charts';
import StatCard from '../Dashboard/StatCard';
import { designData } from './constants';

const DesignOverview = () => {
  const stats = designData.designStats;

  const categoryData = stats.designCategories.map((item) => ({
    id: item.category,
    value: item.count,
    label: item.category,
  }));

  const processSteps = designData.designProcess;

  return (
    <Grid container spacing={3}>
      {/* Key Metrics */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Total Designs'
          value={stats.totalDesigns}
          icon='📐'
          color='primary.main'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Active Designs'
          value={stats.activeDesigns}
          icon='🎨'
          color='success.main'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='Approved This Month'
          value={stats.approvedThisMonth}
          icon='✅'
          color='info.main'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title='In Development'
          value={stats.inDevelopment}
          icon='⚡'
          color='warning.main'
        />
      </Grid>

      {/* Design Categories Distribution */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Design Categories Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: categoryData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: 'gray',
                  },
                },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Popular Colors */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Popular Color Trends
            </Typography>
            <Box sx={{ mt: 2 }}>
              {stats.popularColors.map((color, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box display='flex' justifyContent='space-between' mb={1}>
                    <Typography variant='body2'>{color.color}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {color.usage} designs
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={(color.usage / stats.totalDesigns) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Design Process Timeline */}
      <Grid size={{ xs: 12 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Design Development Process
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {processSteps.map((step, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      textAlign: 'center',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: 8,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant='subtitle2' fontWeight='bold' mb={1}>
                      {step.stage}
                    </Typography>
                    <Typography variant='body2' color='primary.main' mb={1}>
                      {step.duration}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DesignOverview;
