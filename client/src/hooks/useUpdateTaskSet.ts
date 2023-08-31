import { useEffect } from 'react';
import { IGroupedTasks } from '../models';
import { useGetTasksInBoardQuery } from '../services/taskService';
import { updateTaskSet } from '../store/slices/boardSlice';
import { useAppDispatch } from './useAppDispatch';

export const useUpdateTaskSet = (boardId: string) => {
  const dispatch = useAppDispatch();
  const { data: tasks } = useGetTasksInBoardQuery(boardId);

  useEffect(() => {
    if (tasks) {
      const groupedTasks = tasks.reduce((acc: IGroupedTasks, task) => {
        if (!acc[task.ColumnId]) {
          acc[task.ColumnId] = [task];
        } else {
          acc[task.ColumnId].push(task);
        }

        return acc;
      }, {});

      dispatch(updateTaskSet(groupedTasks));
    }
  }, [dispatch, tasks]);

  return tasks?.map(task => task.id) ?? [];
};
