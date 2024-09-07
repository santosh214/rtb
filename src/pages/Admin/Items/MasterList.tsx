// src/components/MasterList.tsx
import React from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { Item, ItemIndex } from './utils/model';
import { UITable } from '../../../components/UIElements/Table';
import { itemsColumns } from './utils/constant';
import { NavLink } from 'react-router-dom';
import { sectionSpacing } from '../../../utils/constant';
import UIButton from '../../../components/UIElements/Button';

interface MasterListProps {
  masterList: Item[];
  addItem: (item: Item) => void;
  updateItem: (index: ItemIndex, item: Item) => void;
  deleteItem: (index: ItemIndex) => void;
}

const MasterList: React.FC<MasterListProps> = ({
  masterList,
}) => {



  return (
    <Box >
      <Typography  fontWeight={600} variant='h5'>All Items</Typography>

      <Box display={'flex'} justifyContent={'end'} mb={sectionSpacing}>
        <NavLink to={'/dashboard/items/add'}>
          <UIButton variant="contained">Add Item</UIButton>
        </NavLink>
      </Box>
      <Grid container spacing={sectionSpacing}>
        <Grid item xs={12} sm={12} md={4}>
          search box
        </Grid>
        <Grid item xs={12}>
          <UITable
            data={masterList} // Ensure data is not undefined
            columns={itemsColumns}
            onEdit={(id) => console.log(`Edit item ${id}`)}
            onDelete={(id) => console.log(`Delete item ${id}`)}
            route="items"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MasterList;
