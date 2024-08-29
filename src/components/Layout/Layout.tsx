import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Router from './Router';
import Sidebar from './Sidebar';

export default function Layout() {
    const isLoginPage = window.location.pathname === '/auth/login'; // Check if it's the login page
    console.log("🚀 ~ Layout ~ window.location.pathname:", window.location.pathname)
    console.log("🚀 ~ Layout ~ isLoginPage:", isLoginPage)

  return (
    <>
    {/* {!isLoginPage && <Navbar/>} */}
    <Navbar/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
    {!isLoginPage && <Sidebar/>}

        <Box
          component="main"
          sx={{ bgcolor: 'background.default', p: 3 }}
          width={'100%'}
        >
          <Router />
        </Box>
      </Box>
    </>
  );
}
