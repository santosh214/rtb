// src/components/ItemsOfTheDay.tsx
import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { Item, ItemIndex } from './utils/model';
import { api } from './api';
import { toast } from 'react-toastify';
import { UITable } from '../../../components/UIElements/Table';
import { itemsColumns } from './utils/constant';
import UIButton from '../../../components/UIElements/Button';
import { sectionSpacing, shadowPadding } from '../../../utils/constant';
import { getAdmin } from '../../../utils/utlis';

interface ItemsOfTheDayProps {
  masterList: Item[];
}

const ItemsOfTheDay: React.FC<ItemsOfTheDayProps> = ({ masterList }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [itemsOfTheDay, setItemsOfTheDay] = useState<Item[]>([]);

  const handleAddItemOfTheDay = async () => {
    const item = masterList.find((item) => item.name === selectedItem);
    if (item && quantity !== '') {
      try {
        const AddItem = await api.addItemsOfTheDay({
          ...item,
          quantity: Number(quantity),
        });
        console.log('🚀 ~ handleAddItemOfTheDay ~ AddItem:', AddItem);
        toast.success('Item added successfully');
        getItemListOfTheDay();
      } catch (error) {
        console.log('🚀 ~ handleAddItemOfTheDay ~ error:', error);
      }
      setSelectedItem('');
      setQuantity('');
    }
  };

  useEffect(() => {
    getItemListOfTheDay();
    return () => {};
  }, []);

  const getItemListOfTheDay = async () => {
    try {
      const _items = await api.getItemsOfTheDay();
      console.log('🚀 ~ getItems ~ :', _items);
      setItemsOfTheDay(_items); // Set the user data correctly
    } catch (error) {
      console.error('🚀 ~ getItems ~ error:', error);
      toast.error('Failed to fetch items list');
    }
  };
  return (
    <Box sx={{ ...shadowPadding }}>
      <Typography fontWeight={600} variant="h5">
        Items Of The Day
      </Typography>

      {getAdmin() ? (
        <Grid container spacing={2} pt={2} pb={3}>
          <Grid item xs={12} sm={3} md={4}>
            <Select
              fullWidth
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value as string)}
            >
              {masterList.map((item, index) => (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={3} alignItems={'center'} display={'flex'}>
            <UIButton onClick={handleAddItemOfTheDay}>Add Item</UIButton>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}

      <Grid container spacing={sectionSpacing}>
        <Grid item xs={12}>
          <UITable columns={itemsColumns} data={itemsOfTheDay} route="items" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemsOfTheDay;
