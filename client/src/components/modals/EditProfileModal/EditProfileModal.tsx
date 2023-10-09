import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '../../../hooks/useUpdateProfile';
import { validateOptions } from '../../../constants';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './EditProfileModal.scss';

interface IFormValues {
  name: string;
  email: string;
}

interface IModalProps {
  id: string;
  name: string;
  email: string;
  children: ReactElement;
}

function EditProfileModal({ id, name, email, children }: IModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = useUpdateProfile(id, handleClose);

  return (
    <>
      <Box onClick={handleOpen}>{children}</Box>
      <Dialog className="edit-profile" open={open} onClose={handleClose}>
        <DialogTitle id="edit-profile">Edit profile</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="edit-profile__content">
            <TextField
              autoFocus
              label="Name*"
              defaultValue={name}
              fullWidth
              autoComplete="username"
              {...register('name', validateOptions.name)}
            />
            {errors.name && (
              <Typography
                variant="caption"
                color="error"
                className="edit-profile__input-error">
                Should be from 1 to 32 characters long
              </Typography>
            )}
            <TextField
              label="Email*"
              type="email"
              defaultValue={email}
              fullWidth
              autoComplete="email"
              {...register('email', validateOptions.email)}
            />
            {errors.email && (
              <Typography
                variant="caption"
                color="error"
                className="edit-profile__input-error">
                Should be a valid email
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={handleClose} color="primary">
              cancel
            </Button>
            <Button type="submit" variant="contained">
              save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditProfileModal;
