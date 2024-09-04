// src/components/MasterList.tsx
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  addItem,
  updateItem,
  deleteItem,
}) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');

  const handleAddItem = () => {
    if (itemName && quantity !== '' && price !== '') {
      addItem({
        id: Math.random().toString(),
        name: itemName,
        quantity: Number(quantity),
        price: Number(price),
      });
      setItemName('');
      setQuantity('');
      setPrice('');
    }
  };

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
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MasterList;
