import {
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { useTranslation } from '../../../hooks/useTranslation';
import { useUpdateBoardMutation } from '../../../services/boardService';
import { NewBoard } from '../../../models';
import ChooseImageModal from '../ChooseImageModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { validateOptions } from '../../../constants';
import './EditBoardModal.scss';

type FormValues = Omit<NewBoard, 'image'>;
interface IModalProps {
  name: string;
  description: string;
  id: string;
  imageFromProps: string;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

function EditBoardModal({
  name,
  description,
  id,
  imageFromProps,
  setIsUpdating,
  children,
}: IModalProps) {
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

  const onCloseWithPropImage = () => {
    handleClose();
    setImage(imageFromProps);
  };

  const [image, setImage] = useState(imageFromProps);

  const [
    updateBoard,
    { isLoading: isBoardUpdating, isError: updateBoardError },
  ] = useUpdateBoardMutation();

  const onSubmit = async (data: FormValues) => {
    handleClose();
    await updateBoard({ ...data, image, id });
  };

  useEffect(
    () => setIsUpdating(isBoardUpdating),
    [setIsUpdating, isBoardUpdating]
  );

  const t = useTranslation('modals');
  useErrorHandler(updateBoardError, t?.editBoardModal.updateError);

  return (
    <>
      <Tooltip title="Update board">
        <Box className="btn-modal" onClick={handleOpen}>
          {children}
        </Box>
      </Tooltip>
      <Dialog open={open} onClose={onCloseWithPropImage} className="edit-board">
        <DialogTitle className="edit-board__title">
          {t?.editBoardModal.edit}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ padding: '0 16px 16px 16px' }}>
            <Box
              sx={{ backgroundImage: `${image}` }}
              className="edit-board__preview"
            />
            <ChooseImageModal setImage={setImage} />
            <TextField
              label={t?.editBoardModal.name}
              defaultValue={name}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              {...register('name', validateOptions.name)}
            />
            <TextField
              label={t?.editBoardModal.description}
              defaultValue={description}
              fullWidth
              size="small"
              {...register('description', validateOptions.description)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseWithPropImage}>
              {t?.commonBtns.cancel}
            </Button>
            <Button variant="contained" type="submit" disabled={!isValid}>
              {t?.editBoardModal.updateBtn}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditBoardModal;
