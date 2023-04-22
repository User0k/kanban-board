import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import './DeleteConfirmModal.scss';

interface IModalProps {
  element: string;
  onDelete: () => Promise<void>;
}

function DeleteConfirmModal({ element, onDelete }: IModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    setOpen(false);
    await onDelete();
  };

  return (
    <>
      <Tooltip title="Delete board">
        <DeleteForeverIcon
          sx={{ m: 1 }}
          className="delete-button"
          onClick={handleOpen}
        />
      </Tooltip>
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
