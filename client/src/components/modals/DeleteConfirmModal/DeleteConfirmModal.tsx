import { useState, ReactElement } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

interface IModalProps {
  element?: string;
  onDelete: () => Promise<void>;
  children: ReactElement;
  provideTooltip?: boolean;
}

function DeleteConfirmModal({
  element = '',
  onDelete,
  children,
  provideTooltip = true,
}: IModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    setOpen(false);
    await onDelete();
  };

  const t = useTranslation('modals');

  return (
    <>
      {provideTooltip ? (
        <Tooltip title={`Delete ${element}`}>
          <Box className="btn-modal" onClick={handleOpen}>
            {children}
          </Box>
        </Tooltip>
      ) : (
        <Box className="btn-modal" onClick={handleOpen}>
          {children}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ maxWidth: 337 }}>
          {t?.deleteConfirmModal.confirmation} {element}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t?.deleteConfirmModal.deleteBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteConfirmModal;
