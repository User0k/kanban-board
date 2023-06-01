import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useCreateColumnMutation } from '../../../services/columnService';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { NewColumn } from '../../../models';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CreateColumnModal.scss';

type FormValues = NewColumn;

interface IModalProps {
  boardId: string;
  setIsColumnCreating: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

function CreateColumnModal({
  boardId,
  setIsColumnCreating,
  children,
}: IModalProps) {
  const [
    createColumn,
    { isLoading: isColumnCreating, isError: createColumnError },
  ] = useCreateColumnMutation();

  useEffect(() => {
    isColumnCreating ? setIsColumnCreating(true) : setIsColumnCreating(false);
  }, [isColumnCreating, setIsColumnCreating]);

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await createColumn({ boardId, title: data.title });
    reset();
    setIsOpen(false);
  };

  useErrorHandler(createColumnError, 'Unable to create column');

  return (
    <>
      <Box
        className="modal-column__btn-wrapper"
        onClick={() => setIsOpen(true)}>
        {children}
      </Box>
      <Dialog
        className="modal-column"
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <DialogTitle id="create-column">Add a column</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-column__content">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="new_title"
              label="Column title*"
              type="text"
              fullWidth
              {...register('title', { required: true })}
            />
            {errors.title && (
              <Typography variant="caption" color="error">
                Please, specify a title
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={() => setIsOpen(false)} color="primary" autoFocus>
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

export default CreateColumnModal;
