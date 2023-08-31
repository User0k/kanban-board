import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useLoginMutation } from '../../services/authService';
import useLogin from '../../hooks/useLogin';
import { LoginFields } from '../../models';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const [errorMsg, setErrormsg] = useState('Server failed to proceed');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const [
    login,
    {
      data: userData,
      isLoading: isUserCreating,
      isError: userCreateError,
      error,
    },
  ] = useLoginMutation();

  const onSubmit = async (data: LoginFields) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (error && 'originalStatus' in error && error.originalStatus >= 400) {
      setErrormsg('Email or password is wrong');
    }
  }, [error]);

  useLogin(userData);
  useErrorHandler(userCreateError, errorMsg);

  return (
    <Container id="auth-page">
      <Typography variant="h5" component="h1" className="auth-title">
        Log in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            autoFocus
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
            Log in
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginPage;
