import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { designData } from './constants';

const PatternsTable = ({ onViewPattern }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Pattern Library
        </Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Pattern ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Repeat</TableCell>
                <TableCell>Complexity</TableCell>
                <TableCell>Variations</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designData.patterns.map((pattern) => (
                <TableRow key={pattern.id} hover>
                  <TableCell>{pattern.id}</TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {pattern.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={pattern.type}
                      variant='outlined'
                      size='small'
                    />
                  </TableCell>
                  <TableCell>{pattern.category}</TableCell>
                  <TableCell>{pattern.repeat}</TableCell>
                  <TableCell>
                    <Chip
                      label={pattern.complexity}
                      color={
                        pattern.complexity === 'Low'
                          ? 'success'
                          : pattern.complexity === 'Medium'
                          ? 'warning'
                          : 'error'
                      }
                      size='small'
                    />
                  </TableCell>
                  <TableCell>{pattern.variations?.length || 0}</TableCell>
                  <TableCell>
                    <Button size='small' onClick={() => onViewPattern(pattern)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PatternsTable;
