import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTaskMutation } from '../../../services/taskService';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CreateTaskModal.scss';

interface IFormValues {
  title: string;
  description: string;
}

interface IModalProps {
  boardId: string;
  columnId: string;
  setIsTaskCreating: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

function CreateTaskModal({
  boardId,
  columnId,
  setIsTaskCreating,
  children,
}: IModalProps) {
  const [createTask, { isLoading: isTaskCreating, isError: createTaskError }] =
    useCreateTaskMutation();

  useEffect(() => {
    isTaskCreating ? setIsTaskCreating(true) : setIsTaskCreating(false);
  }, [isTaskCreating, setIsTaskCreating]);

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit = async (data: IFormValues) => {
    await createTask({
      boardId,
      columnId,
      title: data.title,
      description: data.description,
    });
    reset();
    setIsOpen(false);
  };

  useErrorHandler(createTaskError, 'Unable to create task');

  return (
    <>
      <Box className="modal-task__btn-wrapper" onClick={() => setIsOpen(true)}>
        {children}
      </Box>
      <Dialog
        className="modal-task"
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <DialogTitle id="create-task">Add a task</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-task__content">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="new_title"
              label="Task title*"
              type="text"
              fullWidth
              {...register('title', { required: true })}
            />
            {errors.title && (
              <Typography
                className="modal-task__title-error"
                variant="caption"
                color="error">
                Please, specify a title
              </Typography>
            )}
            <TextField
              margin="dense"
              id="new_description"
              label="Task description"
              type="text"
              fullWidth
              {...register('description')}
            />
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

export default CreateTaskModal;
