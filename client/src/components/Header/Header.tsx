import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import LoggedInBtnGroup from './AuthButtonGroups/LoggedInBtnGroup';
import LogOutedBtnGroup from './AuthButtonGroups/LogOutedBtnGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Header.scss';

export default function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.authSlice);

  return (
    <AppBar id="header" position="static">
      <Toolbar disableGutters={true}>
        <IconButton component={Link} to={'/'} sx={{ mr: 2 }}>
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Home</Typography>
        </IconButton>
        {isLoggedIn ? (
          <IconButton component={Link} to={'/boards'} sx={{ mr: 2 }}>
            <DashboardIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Boards</Typography>
          </IconButton>
        ) : (
          <Box sx={{ width: '125px' }}></Box>
        )}
        <Stack direction={'row'}>
          {isLoggedIn ? <LoggedInBtnGroup /> : <LogOutedBtnGroup />}
          <ButtonGroup
            variant="text"
            aria-label="lang switcher"
            className="lang-switcher">
            <Button className="lang-active">En</Button>
            <Button>Ru</Button>
          </ButtonGroup>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
