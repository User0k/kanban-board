import { NewBoard } from '../../../models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBoardMutation } from '../../../services/boardService';
import imgMinifyer from '../../../utils/imgMinifyer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ChooseImageModal from '../ChooseImageModal';
import { PRELOADED_IMAGES } from '../../../constants';
import './NewBoardModal.scss';

type FormValues = Omit<NewBoard, 'image'>;

function NewBoardModal() {
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

  const [imageToSet] = imgMinifyer([PRELOADED_IMAGES[0]]);
  const [image, setImage] = useState(imageToSet);

  const [createBoard] = useCreateBoardMutation();
  const onSubmit = async (data: FormValues) => {
    handleClose();
    await createBoard({ ...data, image });
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
            <ChooseImageModal setImage={setImage} />
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
