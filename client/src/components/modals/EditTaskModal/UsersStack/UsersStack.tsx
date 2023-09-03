import { useAppSelector } from '../../../../hooks/useAppSelector';
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

  return (
    <Stack className="user-btns-wrapper" direction="row">
      {usersInTask &&
        usersInTask.map((user) => <UserButton key={user.id} user={user} />)}
      <ChooseUserModal
        taskId={id}
        usersIds={usersInTask?.map((user) => user.id) || []}>
        <Tooltip title="Assign user">
          <Avatar className="btn-assign">+</Avatar>
        </Tooltip>
      </ChooseUserModal>
    </Stack>
  );
}

export default UsersStack;
