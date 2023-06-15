import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useRegisterMutation } from '../../services/authService';
import { setUser, setIsLoggedIn } from '../../store/slices/authSlice';
import { IUserFields } from '../../models';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ErrorBar from '../../components/ErrorBar';
import './RegisterPage.scss';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrormsg] = useState('Unable to create account');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFields>();

  const [
    registerUser,
    {
      data: userData,
      isLoading: isUserCreating,
      isError: userCreateError,
      error,
    },
  ] = useRegisterMutation();

  const onSubmit = async (data: IUserFields) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (userData) {
      const { accessToken, user } = userData;
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem('accessToken', accessToken);
      navigate('/boards');
    }
  }, [userData, dispatch, navigate]);

  useEffect(() => {
    if (error && 'originalStatus' in error && error.originalStatus === 403) {
      setErrormsg('User with this email already exists');
    }
  }, [error]);

  useErrorHandler(userCreateError, errorMsg);

  return (
    <>
      <ErrorBar />
      <Container id="register-page">
        <Typography variant="h5" component="h1" className="registration-title">
          Create a new account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              autoFocus
              margin="dense"
              label="Name*"
              autoComplete="username"
              {...register('name', { required: true, maxLength: 32 })}
            />
            {errors.name && (
              <Typography variant="caption" color="error">
                Should be from 1 to 32 characters long
              </Typography>
            )}
            <TextField
              margin="dense"
              label="Email*"
              type="email"
              autoComplete="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <Typography variant="caption" color="error">
                Should be a valid email
              </Typography>
            )}
            <TextField
              margin="dense"
              label="Password*"
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 32,
              })}
            />
            {errors.password && (
              <Typography variant="caption" color="error">
                Should be from 6 to 32 characters long
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isUserCreating}
              sx={{ mt: 1 }}>
              Create account
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default RegisterPage;
