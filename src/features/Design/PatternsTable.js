import React, { useState, useMemo } from 'react';
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
  TableSortLabel,
} from '@mui/material';
import { designData } from './constants';

const PatternsTable = ({ onViewPattern }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedPatterns = useMemo(() => {
    return [...designData.patterns].sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle variations count for sorting
      if (orderBy === 'variationsCount') {
        aValue = a.variations?.length || 0;
        bValue = b.variations?.length || 0;
      }

      // Handle numeric values
      if (typeof aValue === 'number' || orderBy === 'variationsCount') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle string values
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [orderBy, order]);

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };
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
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={createSortHandler('id')}
                  >
                    Pattern ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={createSortHandler('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'type'}
                    direction={orderBy === 'type' ? order : 'asc'}
                    onClick={createSortHandler('type')}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'category'}
                    direction={orderBy === 'category' ? order : 'asc'}
                    onClick={createSortHandler('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'repeat'}
                    direction={orderBy === 'repeat' ? order : 'asc'}
                    onClick={createSortHandler('repeat')}
                  >
                    Repeat
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'complexity'}
                    direction={orderBy === 'complexity' ? order : 'asc'}
                    onClick={createSortHandler('complexity')}
                  >
                    Complexity
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'variationsCount'}
                    direction={orderBy === 'variationsCount' ? order : 'asc'}
                    onClick={createSortHandler('variationsCount')}
                  >
                    Variations
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPatterns.map((pattern) => (
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
