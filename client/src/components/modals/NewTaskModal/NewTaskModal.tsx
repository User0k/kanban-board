import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTaskMutation } from '../../../services/taskService';
import { UseErrorHandler } from '../../../store/hooks';
import { NewTask } from '../../../models';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './NewTaskModal.scss';

type FormValues = NewTask;

interface IModalProps {
  boardId: string;
  columnId: string;
  setIsTaskCreating: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

function NewTaskModal({
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
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await createTask({
      boardId,
      columnId,
      title: data.title,
      description: data.description,
    });
    reset();
    setIsOpen(false);
  };

  UseErrorHandler(createTaskError, 'Unable to create task');

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
              autoFocus
              margin="dense"
              id="new_description"
              label="Task description"
              type="text"
              fullWidth
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

export default NewTaskModal;