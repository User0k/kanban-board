import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { updateColumnSet, updateTaskSet } from '../store/slices/boardSlice';
import { useReorderColumnMutation } from '../services/columnService';
import { useReorderTasksMutation } from '../services/taskService';

export const useDragEnd = (boardId: string) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.boardReducer);
  const { tasks } = useAppSelector((state) => state.boardReducer);
  const [reorderColumns] = useReorderColumnMutation();
  const [reorderTasks] = useReorderTasksMutation();

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
      await reorderColumns({
        boardId,
        id: draggableId,
        targetOrder: destination.index + 1,
      });
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const newTasks = [...tasks[source.droppableId]];
      const draggableTask = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, ...draggableTask);
      dispatch(updateTaskSet({ ...tasks, [source.droppableId]: newTasks }));
      await reorderTasks({
        boardId,
        columnId: source.droppableId,
        id: draggableId,
        targetOrder: destination.index + 1,
      });
      return;
    }

    const destinationTasks = [...(tasks[destination.droppableId] || [])];
    const sourceTasks = [...tasks[source.droppableId]];
    const draggableTask = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, ...draggableTask);
    dispatch(
      updateTaskSet({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      })
    );

    await reorderTasks({
      boardId,
      columnId: source.droppableId,
      targetColumnId: destination.droppableId,
      id: draggableId,
      targetOrder: destination.index + 1,
    });
  };
};
