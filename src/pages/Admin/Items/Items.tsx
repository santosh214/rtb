import React, { useState } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Button, Typography, Paper } from '@mui/material';

const Items = () => {
  // Sample data for demonstration
  const [currentMenu, setCurrentMenu] = useState(['Pizza', 'Burger', 'Salad']);
  const [masterList, setMasterList] = useState([
    'Pizza', 'Burger', 'Salad', 'Pasta', 'Sushi', 'Sandwich', 'Fries'
  ]);

  const handleAddItem = (item:any) => {
    setCurrentMenu((prevMenu) => [...prevMenu, item]);
  };

  const handleRemoveItem = (item:any) => {
    setCurrentMenu((prevMenu) => prevMenu.filter((menuItem) => menuItem !== item));
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Current Menu Items</Typography>
            <List>
              {currentMenu.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                  <Button variant="outlined" color="error" onClick={() => handleRemoveItem(item)}>
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Master List</Typography>
            <List>
              {masterList.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                  <Button variant="outlined" color="primary" onClick={() => handleAddItem(item)}>
                    Add
                  </Button>
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
