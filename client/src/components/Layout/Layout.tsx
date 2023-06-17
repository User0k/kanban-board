import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';
import ErrorBar from '../ErrorBar';

function Layout() {
  return (
    <Box className="layout">
      <CssBaseline />
      <ErrorBar />
      <Header />
      <Outlet />
    </Box>
  );
}

export default Layout;
