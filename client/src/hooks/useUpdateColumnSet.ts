import { useEffect } from 'react';
import { useGetColumnsInBoardQuery } from '../services/columnService';
import { updateColumnSet } from '../store/slices/boardSlice';
import { useAppDispatch } from './useAppDispatch';

export const useUpdateColumnSet = (boardId: string) => {
  const dispatch = useAppDispatch();

  const {
    data: columns,
    isLoading: isColumnsLoading,
    isError: columnsGetError,
  } = useGetColumnsInBoardQuery(boardId);

  useEffect(() => {
    if (!isColumnsLoading && columns) {
      dispatch(updateColumnSet(columns));
    }
  }, [isColumnsLoading, columns, dispatch]);

  return { isColumnsLoading, columnsGetError };
};
