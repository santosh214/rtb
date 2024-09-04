// src/components/AdminItemView.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Item } from './utils/model';

interface AdminItemViewProps {
  itemsOfTheDay: Item[];
}

const AdminItemView: React.FC<AdminItemViewProps> = ({ itemsOfTheDay }) => {
  return (
    <div>
      <h2>Admin View - All Items In Canteen</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsOfTheDay.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminItemView;
