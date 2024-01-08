import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import useLogin from '../../hooks/useLogin';
import { useTranslation } from '../../hooks/useTranslation';
import { useRegisterMutation } from '../../services/authService';
import { IUserFields } from '../../models';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { validateOptions } from '../../constants';
import './RegisterPage.scss';

function RegisterPage() {
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

  const t = useTranslation('registerPage');
  const [errorMsg, setErrormsg] = useState(t?.registerError);

  useEffect(() => {
    if (error && 'originalStatus' in error && error.originalStatus === 403) {
      setErrormsg(t?.existError);
    }
  }, [error, t?.existError]);

  useLogin(userData);
  useErrorHandler(userCreateError, errorMsg);

  return (
    <Container id="auth-page">
      <Typography variant="h5" component="h1" className="auth-title">
        {t?.header}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            autoFocus
            margin="dense"
            label={t?.name}
            autoComplete="username"
            {...register('name', validateOptions.name)}
          />
          {errors.name && (
            <Typography variant="caption" color="error">
              {t?.validateError.name}
            </Typography>
          )}
          <TextField
            margin="dense"
            label={t?.email}
            type="email"
            autoComplete="email"
            {...register('email', validateOptions.email)}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {t?.validateError.email}
            </Typography>
          )}
          <TextField
            margin="dense"
            label={t?.password}
            type="password"
            autoComplete="current-password"
            {...register('password', validateOptions.password)}
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {t?.validateError.password}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isUserCreating}
            sx={{ mt: 1 }}>
            {t?.createBtn}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default RegisterPage;
