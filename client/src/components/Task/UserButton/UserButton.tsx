import { useState } from 'react';
import { AssignedUser } from '../../../models';
import { nameAbbreviation } from '../../../utils/nameAbbreviation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './UserButton.scss';

function UserButton({ user }: { user: AssignedUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const abbrName = nameAbbreviation(user.name);

  return (
    <>
      <Tooltip title={user.name}>
        <Avatar
          className="avatar-small"
          sx={{ bgcolor: user.color }}
          onClick={handleOpen}>
          {abbrName}
        </Avatar>
      </Tooltip>
      <Dialog className="modal-profile" open={open} onClose={handleClose}>
        <CloseIcon className="btn-close" onClick={handleClose} />
        <DialogTitle className="modal-profile__header">
          <Stack direction="row">
            <Avatar className="avatar-large" sx={{ bgcolor: user.color }}>
              {abbrName}
            </Avatar>
            <Typography
              className="modal-profile__user-name"
              variant="subtitle1">
              {user.name}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography className="unassign-btn" variant="body2">
            Unasssign from a task
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserButton;
