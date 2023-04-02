import { api } from './api';
import { IColumn, GetColumn, NewColumn, IReorderColumn } from '../models';

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getColumnsInBoard: build.query<IColumn[], string>({
      query: (id = '') => ({
        url: `boards/${id}/columns/`,
      }),
      providesTags: ['Column'],
    }),
    getColumnById: build.query<IColumn, GetColumn>({
      query: ({ boardId, id }) => ({
        url: `boards/${boardId}/columns/${id}`,
      }),
    }),
    createColumn: build.mutation<IColumn, NewColumn>({
      query: ({ boardId, ...body }) => ({
        url: `boards/${boardId}/columns/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Column'],
    }),
    updateColumn: build.mutation<IColumn, IColumn>({
      query: ({ boardId, id, ...body }) => ({
        url: `boards/${boardId}/columns/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Column'],
    }),
    reorderColumn: build.mutation<IColumn, IReorderColumn>({
      query: ({ boardId, id, ...body }) => ({
        url: `boards/${boardId}/columns/${id}/reorder`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Column'],
    }),
    deleteColumn: build.mutation<IColumn, GetColumn>({
      query: ({ boardId, id }) => ({
        url: `boards/${boardId}/columns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Column'],
    }),
  }),
});

export const {
  useGetColumnsInBoardQuery,
  useGetColumnByIdQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useReorderColumnMutation,
  useDeleteColumnMutation,
} = boardApi;
