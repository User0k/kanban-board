import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { updateColumnSet } from '../store/slices/columnSetSlice';
import { useReorderColumnMutation } from '../services/columnService';

export const useDragEnd = (boardId: string) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.columnSetReducer);
  const [reorderColumn] = useReorderColumnMutation();

  return async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumns = [...columns];
      const draggableColumn = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, ...draggableColumn);
      dispatch(updateColumnSet(newColumns));
      await reorderColumn({ boardId, id: draggableId, targetOrder: destination.index + 1});
      return;
    }
  }
};
