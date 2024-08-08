import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Navbar from './Navbar';
import { MenuList } from '../../utils/constant';
import Users from '../../pages/Admin/users/Users';
import Items from '../../pages/Admin/Items/Items';
import Transactions from '../../pages/Admin/Transaction/Transactions';
import AddUser from '../../pages/Admin/users/AddUser';

const drawerWidth = 240;

export default function Sidebar() {
    const navigate = useNavigate()
    const handleNavigation = (route: string) => {
        navigate(route)
    }
    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
                <Drawer
                    sx={{

                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            position: 'unset'
                        },
                    }}
                    variant="permanent"
                    anchor="left"

                >
                    {/* <Toolbar /> */}
                    <Divider />
                    <List>
                        {MenuList.map((items, index) => (
                            <ListItem key={items.id} disablePadding >
                                <ListItemButton onClick={() => handleNavigation(items.route)}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={items.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
                </Drawer>
                <Box
                    component="main"
                    sx={{ bgcolor: 'background.default', p: 3 }}
                    width={'100%'}
                >
                    {/* <Toolbar /> */}
                    <Routes>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/dashboard/items" element={<Items />} />
                        <Route path="/dashboard/users" element={<Users />} />
                        <Route path="/dashboard/transactions" element={<Transactions />} />
                        <Route path="/dashboard/users/add" element={<AddUser />} />
                    </Routes>
                </Box>
            </Box>
        </>

    );
}
