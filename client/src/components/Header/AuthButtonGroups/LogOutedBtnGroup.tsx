import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';

function LogOutedBtnGroup() {
  return (
    <>
      <IconButton component={Link} to={'/register'}>
        <PersonAddIcon sx={{ mr: 1 }} />
        <Typography>Sign up</Typography>
      </IconButton>
      <IconButton component={Link} to={'/login'}>
        <LoginIcon sx={{ mr: 1 }} />
        <Typography>Log in</Typography>
      </IconButton>
    </>
  );
}

export default LogOutedBtnGroup;
