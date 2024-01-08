import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';

function LogOutedBtnGroup() {
  const t = useTranslation('header');

  return (
    <>
      <IconButton component={Link} to={'/register'}>
        <PersonAddIcon sx={{ mr: 1 }} />
        <Typography>{t?.registration}</Typography>
      </IconButton>
      <IconButton component={Link} to={'/login'}>
        <LoginIcon sx={{ mr: 1 }} />
        <Typography>{t?.login}</Typography>
      </IconButton>
    </>
  );
}

export default LogOutedBtnGroup;
