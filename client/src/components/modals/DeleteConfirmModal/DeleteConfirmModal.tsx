import { useState, ReactElement } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

interface IModalProps {
  element: string;
  onDelete: () => Promise<void>;
  children: ReactElement;
}

function DeleteConfirmModal({ element, onDelete, children }: IModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    setOpen(false);
    await onDelete();
  };

  return (
    <>
      <Box onClick={handleOpen}>{children}</Box>
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
    </>
  );
}

export default DeleteConfirmModal;
