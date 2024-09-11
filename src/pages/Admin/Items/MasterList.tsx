import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField, // For the search input
} from '@mui/material';
import { Item, ItemIndex } from './utils/model';
import { UITable } from '../../../components/UIElements/Table';
import { itemsColumns } from './utils/constant';
import { NavLink } from 'react-router-dom';
import { sectionSpacing, shadowPadding } from '../../../utils/constant';
import UIButton from '../../../components/UIElements/Button';
import { getAdmin } from '../../../utils/utlis';

interface MasterListProps {
  masterList: Item[];
  addItem: (item: Item) => void;
  updateItem: (index: ItemIndex, item: Item) => void;
  deleteItem: (index: ItemIndex) => void;
}

const MasterList: React.FC<MasterListProps> = ({ masterList }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [filteredItems, setFilteredItems] = useState<Item[]>(masterList); // State for filtered list

  // Effect to filter masterList based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredItems(masterList); // Reset to original list if search is empty
    } else {
      setFilteredItems(
        masterList.filter(
          (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()), // Adjust filtering logic as needed
        ),
      );
    }
  }, [searchTerm, masterList]); // Trigger effect when searchTerm or masterList changes

  return (
    <Box sx={{ ...shadowPadding }}>
      <Typography fontWeight={600} variant="h5">
        All Items
      </Typography>

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        mb={sectionSpacing}
        pt={2}
      >
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Search Items" // Input label
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </Grid>
        {getAdmin() ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { md: 'end' },
              alignItems: 'center',
            }}
          >
            <NavLink to={'/dashboard/items/add'}>
              <UIButton variant="contained">Add Item</UIButton>
            </NavLink>
          </Grid>
        ) : (
          <></>
        )}
      </Box>

      {/* Search Box */}
      <Grid container spacing={sectionSpacing}>
        <Grid item xs={12}>
          {/* Use the filteredItems in the table */}
          <UITable
            data={filteredItems} // Use filtered data
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
