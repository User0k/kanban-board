import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useRegisterMutation } from '../../services/authService';
import useLogin from '../../hooks/useLogin';
import { IUserFields } from '../../models';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { validateOptions } from '../../constants';
import './RegisterPage.scss';

function RegisterPage() {
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
    if (error && 'originalStatus' in error && error.originalStatus === 403) {
      setErrormsg('User with this email already exists');
    }
  }, [error]);

  useLogin(userData);
  useErrorHandler(userCreateError, errorMsg);

  return (
    <Container id="auth-page">
      <Typography variant="h5" component="h1" className="auth-title">
        Create a new account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            autoFocus
            margin="dense"
            label="Name*"
            autoComplete="username"
            {...register('name', validateOptions.name)}
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
            {...register('email', validateOptions.email)}
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
            {...register('password', validateOptions.password)}
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
  );
}

export default RegisterPage;
