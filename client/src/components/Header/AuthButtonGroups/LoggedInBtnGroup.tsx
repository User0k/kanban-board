import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useTranslation } from '../../../hooks/useTranslation';
import { resetAuth } from '../../../store/slices/authSlice';
import { useLogoutMutation } from '../../../services/authService';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

function LoggedInBtnGroup() {
  const dispatch = useAppDispatch();
  const [logOutUser] = useLogoutMutation();
  const logOut = async () => {
    dispatch(resetAuth());
    localStorage.clear();
    await logOutUser();
  };

  const t = useTranslation('header');

  return (
    <>
      <IconButton component={Link} to={'/profile'}>
        <AccountCircleIcon sx={{ mr: 1 }} />
        <Typography>{t?.profile}</Typography>
      </IconButton>
      <IconButton component={Link} to={'/'} onClick={logOut}>
        <LogoutIcon sx={{ mr: 1 }} />
        <Typography>{t?.logout}</Typography>
      </IconButton>
    </>
  );
}

export default LoggedInBtnGroup;
