import { useEffect } from 'react';
import { useGetTasksInBoardQuery } from '../services/taskService';
import { updateTaskSet } from '../store/slices/boardSlice';
import { useAppDispatch } from './useAppDispatch';

export const useUpdateTaskSet = (boardId: string) => {
  const dispatch = useAppDispatch();
  const { data: tasksInBoard } = useGetTasksInBoardQuery(boardId);

  useEffect(() => {
    if (tasksInBoard) {
      dispatch(updateTaskSet(tasksInBoard));
    }
  }, [tasksInBoard, dispatch]);
};
