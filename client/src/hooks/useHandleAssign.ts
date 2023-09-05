import {
  useAssignUserMutation,
  useUnassignUserMutation,
} from '../services/userService';
import { useAppDispatch } from './useAppDispatch';
import { addUserToTask, removeUserFromTask } from '../store/slices/boardSlice';
import { AssignedUser } from '../models';

export const useHandleAssign = (taskId: string, users: AssignedUser[]) => {
  const dispatch = useAppDispatch();
  const [assignUser] = useAssignUserMutation();
  const [unassignUser] = useUnassignUserMutation();

  const onAssignUser = async (taskId: string, user: AssignedUser) => {
    dispatch(addUserToTask({ taskId, user }));
    await assignUser({ taskId, id: user.id });
  };

  const onUnassignUser = async (taskId: string, user: AssignedUser) => {
    dispatch(removeUserFromTask({ taskId, user }));
    await unassignUser({ taskId, id: user.id });
  };

  return async function (user: AssignedUser) {
    const isUserAssigned = users.some(
      (assignedUser) => assignedUser.id === user.id
    );
    !isUserAssigned
      ? await onAssignUser(taskId, user)
      : await onUnassignUser(taskId, user);
  };
};
