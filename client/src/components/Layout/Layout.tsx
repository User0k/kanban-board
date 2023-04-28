import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';

function Layout() {
  return (
    <Box className="layout">
      <CssBaseline />
      <Header />
      <Outlet />
    </Box>
  );
}

export default Layout;
