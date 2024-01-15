import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';
import ErrorBar from '../ErrorBar';
import { Suspense } from 'react';
import GlobalSpinner from '../Spinners/GlobalSpinner';

function Layout() {
  return (
    <Box className="layout">
      <CssBaseline />
      <ErrorBar />
      <Header />
      <Suspense fallback={<GlobalSpinner />}>
        <Outlet />
      </Suspense>
    </Box>
  );
}

export default Layout;
