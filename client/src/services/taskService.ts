import { api } from './api';
import {
  IGetTask,
  ITask,
  IUpdateTask,
  NewTask,
  IReorderTask,
  IServerMessage,
} from '../models';

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasksInBoard: build.query<ITask[], string>({
      query: (boardId) => ({
        url: `boards/${boardId}/tasks`,
      }),
      providesTags: ['Task'],
    }),
    getTasksInColumn: build.query<ITask[], Omit<IGetTask, 'id'>>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
      }),
      providesTags: ['Task'],
    }),
    getTaskById: build.query<ITask, IGetTask>({
      query: ({ boardId, columnId, id }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${id}`,
      }),
    }),
    createTask: build.mutation<ITask, NewTask>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<IServerMessage, IUpdateTask>({
      query: ({ boardId, columnId, id, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    reorderTasks: build.mutation<IServerMessage, IReorderTask>({
      query: ({ boardId, columnId, id, ...body }) => ({
        url: `boards/${boardId}/reorder/columns/${columnId}/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<IServerMessage, IGetTask>({
      query: ({ boardId, columnId, id }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksInBoardQuery,
  useGetTasksInColumnQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useReorderTasksMutation,
  useDeleteTaskMutation,
} = boardApi;
