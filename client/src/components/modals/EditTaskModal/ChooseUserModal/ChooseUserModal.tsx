import { ReactElement, useState } from 'react';
import { useGetAllUsersQuery } from '../../../../services/userService';
import { nameAbbreviation } from '../../../../utils/nameAbbreviation';
import { useHandleAssign } from '../../../../hooks/useHandleAssign';
import { useTranslation } from '../../../../hooks/useTranslation';
import { AssignedUser } from '../../../../models';
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
  taskId: string;
  users: AssignedUser[];
  children: ReactElement;
}

function ChooseUserModal({ taskId, users, children }: IModalProps) {
  const [assignOpen, setAssignOpen] = useState(false);
  const { data: allUsers } = useGetAllUsersQuery();
  const onOpenAssign = () => setAssignOpen(true);
  const onCloseAssign = () => setAssignOpen(false);
  const handleAssign = useHandleAssign(taskId, users);
  const t = useTranslation('modals');

  return (
    <>
      <Box onClick={onOpenAssign}>{children}</Box>
      <Dialog
        className="modal-assign"
        open={assignOpen}
        onClose={onCloseAssign}>
        <CloseIcon className="btn-close" onClick={onCloseAssign} />
        <DialogTitle className="modal-assign__header">
          {t?.editTaskModal.participants}
        </DialogTitle>
        <DialogContent className="modal-assign__content">
          <Stack>
            {allUsers &&
              allUsers.map((user) => (
                <Stack
                  key={user.id}
                  className="modal-assign__stack"
                  direction="row"
                  onClick={() => handleAssign(user)}>
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
                  {users.some(
                    (assignedUser) => assignedUser.id === user.id
                  ) && <DoneIcon className="assigned-icon" />}
                </Stack>
              ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChooseUserModal;
