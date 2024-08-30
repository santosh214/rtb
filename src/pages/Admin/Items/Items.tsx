import React, { useEffect, useState } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Button, Typography, Paper, ListItemIcon, Avatar } from '@mui/material';
import { api, canteen_menu } from './utils/api';
import { toast } from 'react-toastify';


const Items = () => {
  // Sample data for demonstration
  const [currentMenu, setCurrentMenu] = useState<canteen_menu>();
  const [masterList, setMasterList] = useState([
    'Pizza', 'Burger', 'Salad', 'Pasta', 'Sushi', 'Sandwich', 'Fries'
  ]);
  useEffect(() => {
      getTodayMenu()
  
    return () => {
      
    }
  }, [])
  

  const getTodayMenu = async() => {
      try {
        const _menu = await api.getFoodItems();
        console.log("🚀 ~ getTodayMenu ~ users:", _menu);
        setCurrentMenu(_menu); // Set the user data correctly
      } catch (error) {
        console.error("🚀 ~ getTodayMenu ~ error:", error);
        toast.error("Failed to fetch Users list");
      }
  };

  // const handleRemoveItem = (item:any) => {
  //   setCurrentMenu((prevMenu) => prevMenu.filter((menuItem) => menuItem !== item));
  // };
  const totalPrice =currentMenu?.today_menu.reduce((acc, item) => {
    return acc + parseFloat(item.price);
  }, 0);
  return (
    <Container>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
      <Paper style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Today's Menu 
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price {totalPrice}
        </Typography>
        <List>
          {currentMenu?.today_menu.map((item, index) => (
            <ListItem key={index} style={{ marginBottom: 8, backgroundColor: '#fff', borderRadius: 8 }}>
              <ListItemIcon>
                <Avatar>
                  {/* <FastfoodIcon /> */}
                </Avatar>
              </ListItemIcon>
              <ListItemText 
                primary={item?.name} 
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
          ))}
        </List>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: 16 }} 
          // onClick={onUpdateMenu}
        >
          Update Menu
        </Button>
      </Paper>
    </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Master List</Typography>
            <List>
              {masterList.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                  {/* <Button variant="outlined" color="primary" onClick={() => handleAddItem(item)}>
                    Add
                  </Button> */}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Items;
