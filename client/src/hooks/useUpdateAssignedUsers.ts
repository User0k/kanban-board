import { useEffect } from 'react';
import { useGetUsersInTasksQuery } from '../services/userService';
import { updateAssignedSet } from '../store/slices/boardSlice';
import { useAppDispatch } from './useAppDispatch';

export const useUpdateAssignedUsers = (tasksIds: string[]) => {
  const dispatch = useAppDispatch();
  const { data: users } = useGetUsersInTasksQuery(tasksIds, {
    skip: tasksIds.length === 0,
  });

  useEffect(() => {
    if (users) {
      dispatch(updateAssignedSet(users));
    }
  }, [users, dispatch]);
};
