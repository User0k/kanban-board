import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useFirstLoad } from '../../hooks/useFirstLoad';
import { useTranslation } from '../../hooks/useTranslation';
import LoggedInBtnGroup from './AuthButtonGroups/LoggedInBtnGroup';
import LogOutedBtnGroup from './AuthButtonGroups/LogOutedBtnGroup';
import LangSwitcher from './LangSwitcher';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './Header.scss';

export default function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  useFirstLoad();
  const t = useTranslation('header');

  return (
    <AppBar id="header" position="static">
      <Toolbar disableGutters={true}>
        <IconButton component={Link} to={'/'} sx={{ mr: 2 }}>
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6">{t?.home}</Typography>
        </IconButton>
        {isLoggedIn ? (
          <IconButton component={Link} to={'/boards'} sx={{ mr: 2 }}>
            <DashboardIcon sx={{ mr: 1 }} />
            <Typography variant="h6">{t?.main}</Typography>
          </IconButton>
        ) : (
          <Box sx={{ width: '125px' }}></Box>
        )}
        <Stack direction={'row'}>
          {isLoggedIn ? <LoggedInBtnGroup /> : <LogOutedBtnGroup />}
          <LangSwitcher />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
