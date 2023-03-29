import { api } from './api';
import { IBoard, NewBoard } from '../models';

export const boardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBoards: build.query<IBoard[], void>({
      query: () => ({
        url: 'boards',
      }),
      providesTags: ['Board'],
    }),
    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
      }),
    }),
    createBoard: build.mutation<IBoard, NewBoard>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoard: build.mutation<IBoard, IBoard>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `boards/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Board'],
    }),
    deleteBoard: build.mutation<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
