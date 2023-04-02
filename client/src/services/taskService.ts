import { api } from './api';
import { IGetTask, ITask, IUpdateTask } from '../models';

/**
 * TODO:
 * Implement reordering tasks in service and controller
 */

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    createTask: build.mutation<ITask, Omit<IUpdateTask, 'id'>>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<ITask, IUpdateTask>({
      query: ({ boardId, columnId, id, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<ITask, IGetTask>({
      query: ({ boardId, columnId, id }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksInColumnQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = boardApi;
