import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useTranslation } from '../../../../hooks/useTranslation';
import UserButton from '../../../Task/UserButton';
import ChooseUserModal from '../ChooseUserModal';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import './UsersStack.scss';

function UsersStack({ id }: { id: string }) {
  const usersInTask = useAppSelector(
    (state) => state.boardReducer.assignedUsers
  )[id];

  const t = useTranslation('modals');

  return (
    <Stack className="user-btns-wrapper" direction="row">
      {usersInTask &&
        usersInTask.map((user) => (
          <UserButton key={user.id} taskId={id} user={user} />
        ))}
      <ChooseUserModal taskId={id} users={usersInTask || []}>
        <Tooltip title={t?.editTaskModal.tooltip}>
          <Avatar className="btn-assign">+</Avatar>
        </Tooltip>
      </ChooseUserModal>
    </Stack>
  );
}

export default UsersStack;
