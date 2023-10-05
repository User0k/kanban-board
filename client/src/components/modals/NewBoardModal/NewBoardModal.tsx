import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { useCreateBoardMutation } from '../../../services/boardService';
import imgMinifyer from '../../../utils/imgMinifyer';
import { NewBoard } from '../../../models';
import GlobalSpinner from '../../Spinners/GlobalSpinner';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ChooseImageModal from '../ChooseImageModal';
import { PRELOADED_IMAGES, validateOptions } from '../../../constants';
import './NewBoardModal.scss';

type FormValues = Omit<NewBoard, 'image'>;
interface IModalProps {
  children: string;
}

function NewBoardModal({ children }: IModalProps) {
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

  const [
    createBoard,
    { isLoading: isBoardCreating, isError: createBoardError },
  ] = useCreateBoardMutation();

  const onSubmit = async (data: FormValues) => {
    handleClose();
    await createBoard({ ...data, image });
  };

  useErrorHandler(createBoardError, 'Unable to create board');

  return (
    <>
      {isBoardCreating && <GlobalSpinner color="success" />}
      <Box className="btn-create-board" onClick={handleOpen}>
        {children}
      </Box>
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
              {...register('name', validateOptions.title)}
            />
            <TextField
              label="Board description*"
              fullWidth
              size="small"
              {...register('description', validateOptions.description)}
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
