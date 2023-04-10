import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface IModalProps {
  element: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => Promise<void>;
}

function DeleteConfirmModal({ element, open, setOpen, onDelete }: IModalProps) {
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    setOpen(false);
    await onDelete();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ maxWidth: 337 }}>
        Are you sure you want to delete the {element}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmModal;
