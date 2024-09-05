// src/components/MasterList.tsx
import React from 'react';
import {
  Button,
  Grid,
  Box,
} from '@mui/material';
import { Item, ItemIndex } from './utils/model';
import { UITable } from '../../../components/UIElements/Table';
import { itemsColumns } from './utils/constant';
import { NavLink } from 'react-router-dom';
import { sectionSpacing } from '../../../utils/constant';

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
    <>
      <Box display={'flex'} justifyContent={'end'} mb={sectionSpacing}>
        <NavLink to={'/dashboard/items/add'}>
          <Button variant="contained">Add Item</Button>
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
    </>
  );
};

export default MasterList;
