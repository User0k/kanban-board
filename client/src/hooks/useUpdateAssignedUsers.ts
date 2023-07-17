import { useEffect } from 'react';
import { useGetAssignedUsersQuery } from '../services/userService';
import { updateAssignedSet } from '../store/slices/boardSlice';
import { useAppDispatch } from './useAppDispatch';

export const useUpdateAssignedUsers = (boardId: string) => {
  const dispatch = useAppDispatch();
  const { data: users } = useGetAssignedUsersQuery(boardId);

  useEffect(() => {
    if (users) {
      dispatch(updateAssignedSet(users));
    }
  }, [users, dispatch]);
};
