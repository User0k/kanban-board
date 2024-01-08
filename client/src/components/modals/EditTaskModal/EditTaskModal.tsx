import { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateTaskMutation } from '../../../services/taskService';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { useTranslation } from '../../../hooks/useTranslation';
import UsersStack from './UsersStack';
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

function EditTaskModal({
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

  const t = useTranslation('modals');
  useErrorHandler(updateTaskError, t?.editTaskModal.editError);

  return (
    <>
      <Box className="modal-task__btn-wrapper" onClick={() => setIsOpen(true)}>
        {children}
      </Box>
      <Dialog
        className="modal-task"
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <DialogTitle id="edit-task">{t?.editTaskModal.header}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="modal-task__content">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label={t?.editTaskModal.title}
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
                {t?.editTaskModal.validateError}
              </Typography>
            )}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label={t?.editTaskModal.description}
                  type="text"
                  fullWidth
                />
              )}
            />
            <UsersStack id={id} />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={() => setIsOpen(false)} color="primary" autoFocus>
              {t?.commonBtns.cancel}
            </Button>
            <Button type="submit" variant="contained">
              {t?.commonBtns.save}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditTaskModal;
