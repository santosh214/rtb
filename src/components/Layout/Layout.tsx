import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Router from './Router';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { UserInterface } from '../../pages/Admin/users/utils';

export default function Layout() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const location = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, [location.pathname]);


  return (
    <>
      <Navbar /> {/* Always show Navbar */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Conditionally render Sidebar if the user is an admin */}
        <Sidebar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{ bgcolor: 'background.default', p: 3 }}
          width={user ? 'calc(100% - 240px)' : '100%'} // Adjust width when sidebar is present
        >
          <Router />
        </Box>
      </Box>
    </>
  );
}
