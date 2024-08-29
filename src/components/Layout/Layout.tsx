import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Router from './Router';
import Sidebar from './Sidebar';

export default function Layout() {

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Sidebar />
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
