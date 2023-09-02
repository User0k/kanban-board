import { ReactElement, useState } from 'react';
import { useGetAllUsersQuery } from '../../../../services/userService';
import { nameAbbreviation } from '../../../../utils/nameAbbreviation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import './ChooseUserModal.scss';

interface IModalProps {
  usersIds: string[];
  children: ReactElement;
}

function ChooseUserModal({ usersIds, children }: IModalProps) {
  const [assignOpen, setAssignOpen] = useState(false);
  const { data: allUsers } = useGetAllUsersQuery();
  const onOpenAssign = () => setAssignOpen(true);
  const onCloseAssign = () => setAssignOpen(false);
  const handleAssign = (userId: string) => usersIds.includes(userId);

  return (
    <>
      <Box onClick={onOpenAssign}>{children}</Box>
      <Dialog className="modal-assign" open={assignOpen} onClose={onCloseAssign}>
        <CloseIcon className="btn-close" onClick={onCloseAssign} />
        <DialogTitle className="modal-assign__header">Participants</DialogTitle>
        <DialogContent className="modal-assign__content">
          <Stack>
            {allUsers &&
              allUsers.map((user) => (
                <Stack
                  key={user.id}
                  className="modal-assign__stack"
                  direction="row"
                  onClick={() => handleAssign(user.id)}>
                  <Stack direction="row" gap={1}>
                    <Avatar
                      className="avatar-medium"
                      sx={{
                        bgcolor: user.color,
                      }}>
                      {nameAbbreviation(user.name)}
                    </Avatar>
                    <Typography className="user-full-name">
                      {user.name}
                    </Typography>
                  </Stack>
                  {usersIds.includes(user.id) && (
                    <DoneIcon className="assigned-icon" />
                  )}
                </Stack>
              ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChooseUserModal;
