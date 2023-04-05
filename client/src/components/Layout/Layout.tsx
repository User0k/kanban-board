import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';
import Footer from '../Footer';

function Layout() {
  return (
    <Box className="layout">
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Layout;
