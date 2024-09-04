// src/components/ItemsOfTheDay.tsx
import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Item, ItemIndex } from './utils/model';

interface ItemsOfTheDayProps {
  masterList: Item[];
  itemsOfTheDay: Item[];
  addItemOfTheDay: (item: Item) => void;
  updateQuantity: (index: ItemIndex, quantity: number) => void;
}

const ItemsOfTheDay: React.FC<ItemsOfTheDayProps> = ({ masterList, itemsOfTheDay, addItemOfTheDay, updateQuantity }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleAddItemOfTheDay = () => {
    const item = masterList.find((item) => item.name === selectedItem);
    if (item && quantity !== '') {
      addItemOfTheDay({ ...item, quantity: Number(quantity) });
      setSelectedItem('');
      setQuantity('');
    }
  };

  return (
    <div>
      <h2>Items Of The Day</h2>
      <Select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value as string)}>
        {masterList.map((item, index) => (
          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
        ))}
      </Select>
      <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <Button variant="contained" color="primary" onClick={handleAddItemOfTheDay}>Add Item</Button>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsOfTheDay.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <TextField 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(index, Number(e.target.value))} 
                />
              </TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsOfTheDay;
