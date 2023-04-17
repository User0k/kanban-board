import { NewBoard } from '../../../models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBoardMutation } from '../../../services/boardService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './NewBoardModal.scss';

type FormValues = NewBoard;

interface IModalProps {
  images: string[];
}

function NewBoardModal({ images }: IModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const [image, setImage] = useState(images[0]);
  const onSetImage = (image: string) => setImage(image);

  const [createBoard] = useCreateBoardMutation();
  const onSubmit = async (data: NewBoard) => {
    handleClose();
    await createBoard(data);
  };

  return (
    <>
      <Button sx={{ mb: 2 }} className="btn-create-board" onClick={handleOpen}>
        create a board
      </Button>
      <Dialog open={open} onClose={handleClose} className="create-board">
        <DialogTitle className="create-board__title">
          Create a board
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ padding: '0 16px 16px 16px' }}>
            <Box
              sx={{ backgroundImage: `${image}` }}
              className="create-board__preview"
            />
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              className="background-change__wrapper">
              <Button variant="contained" size="small">
                Choose image
              </Button>
              <Button variant="contained" size="small">
                Choose gradient
              </Button>
            </Stack>
            <TextField
              label="Board name*"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              {...register('name', { required: true })}
            />
            <TextField
              label="Board description*"
              fullWidth
              size="small"
              {...register('description', { required: true })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={!isValid}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default NewBoardModal;
