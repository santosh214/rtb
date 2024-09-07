// src/AdminItem.tsx
import React, { useEffect, useState } from 'react';
import { Item } from './utils/model';
import MasterList from './MasterList';
import ItemsOfTheDay from './ItemsOfTheDay';
import { api } from './api';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';

const AdminItem: React.FC = () => {
  const [masterList, setMasterList] = useState<Item[]>([]);
  const [itemsOfTheDay, setItemsOfTheDay] = useState<Item[]>([]);

  useEffect(() => {
    
  getItemList()
    return () => {
      
    }
  }, [])
  const getItemList=async()=>{
    try {
        const _items = await api.getItems();
        console.log("🚀 ~ getItems ~ :", _items);
        setMasterList(_items); // Set the user data correctly
      } catch (error) {
        console.error("🚀 ~ getItems ~ error:", error);
        toast.error("Failed to fetch items list");
      }
  }
  
  const addItem = (item: Item) => {
    setMasterList([...masterList, item]);
  };

  const updateItem = (index: number, updatedItem: Item) => {
    const newList = [...masterList];
    newList[index] = updatedItem;
    setMasterList(newList);
  };

  const deleteItem = (index: number) => {
    const newList = [...masterList];
    newList.splice(index, 1);
    setMasterList(newList);
  };

  const addItemOfTheDay = (item: Item) => {
    setItemsOfTheDay([...itemsOfTheDay, item]);
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newList = [...itemsOfTheDay];
    newList[index].quantity = quantity;
    setItemsOfTheDay(newList);
  };

  return (
    <>
      <MasterList
        masterList={masterList} 
        addItem={addItem} 
        updateItem={updateItem} 
        deleteItem={deleteItem} 
      />
      <Divider/>
      <ItemsOfTheDay 
        masterList={masterList} 
      />
    </>
  );
};

export default AdminItem;
