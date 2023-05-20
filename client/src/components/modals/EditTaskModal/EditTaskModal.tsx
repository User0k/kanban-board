import { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateTaskMutation } from '../../../services/taskService';
import { UseErrorHandler } from '../../../store/hooks';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../CreateTaskModal/CreateTaskModal.scss';

interface IFormValues {
  title: string;
  description: string;
}

interface IModalProps {
  boardId: string;
  columnId: string;
  id: string;
  title: string;
  description?: string;
  children: ReactElement;
}

function CreateTaskModal({
  boardId,
  columnId,
  id,
  title,
  description,
  children,
}: IModalProps) {
  const [updateTask, { isError: updateTaskError }] = useUpdateTaskMutation();
  const [isOpen, setIsOpen] = useState(false);
  const defaultValues = { title, description: description || '' };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormValues>({ defaultValues });

  const onSubmit = async (data: IFormValues) => {
    await updateTask({
      boardId,
      columnId,
      id,
      title: data.title,
      description: data.description,
    });
    setIsOpen(false);
    reset({ title: data.title, description: data.description });
  };

  UseErrorHandler(updateTaskError, 'Unable to update task');

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
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="Task title*"
                  type="text"
                  fullWidth
                />
              )}
              rules={{ required: true }}
            />
            {errors.title && (
              <Typography
                className="modal-task__title-error"
                variant="caption"
                color="error">
                Please, specify a title
              </Typography>
            )}
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Task description"
                  type="text"
                  fullWidth
                />
              )}
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
