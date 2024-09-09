import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Router from './Router';
import Sidebar from './Sidebar';

export default function Layout() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === 'admin'; // Check if the user is an admin

  return (
    <>
      <Navbar /> {/* Always show Navbar */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Conditionally render Sidebar if the user is an admin */}
        {isAdmin && <Sidebar />}

        {/* Main content area */}
        <Box
          component="main"
          sx={{ bgcolor: 'background.default', p: 3 }}
          width={isAdmin ? 'calc(100% - 240px)' : '100%'} // Adjust width when sidebar is present
        >
          <Router />
        </Box>
      </Box>
    </>
  );
}
