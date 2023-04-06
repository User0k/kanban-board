import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';
import { ButtonGroup } from '@mui/material';
import './Header.scss';

export default function Header() {
  return (
    <AppBar id="header" position="static">
      <Toolbar disableGutters={true}>
        <IconButton sx={{ mr: 2 }}>
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Home</Typography>
        </IconButton>
        <IconButton sx={{ mr: 2 }}>
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Boards</Typography>
        </IconButton>
        <Stack direction={'row'}>
          <IconButton>
            <PersonAddIcon sx={{ mr: 1 }} />
            <Typography>Sign in</Typography>
          </IconButton>
          <IconButton >
            <LoginIcon sx={{ mr: 1 }} />
            <Typography>Log in</Typography>
          </IconButton>
          <ButtonGroup variant="text" aria-label="lang switcher">
            <Button className='lang-active'>En</Button>
            <Button>Ru</Button>
          </ButtonGroup>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
