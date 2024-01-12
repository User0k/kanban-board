import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useLoginMutation } from '../../services/authService';
import useLogin from '../../hooks/useLogin';
import { useTranslation } from '../../hooks/useTranslation';
import { LoginFields } from '../../models';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { validateOptions } from '../../constants';
import '../RegisterPage/RegisterPage.scss';

function LoginPage() {
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

  const t = useTranslation('loginPage');
  const [errorMsg, setErrormsg] = useState(t?.serverError);

  useEffect(() => {
    if (error && 'originalStatus' in error && error.originalStatus >= 400) {
      setErrormsg(t?.credentialsError);
    }
  }, [error, t?.credentialsError]);

  useLogin(userData);
  useErrorHandler(userCreateError, errorMsg);

  return (
    <Container id="auth-page">
      <Typography variant="h5" component="h1" className="auth-title">
        {t?.logIn}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            autoFocus
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
            className="btn-min-height"
            sx={{ mt: 1 }}>
            {t?.logIn}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginPage;
