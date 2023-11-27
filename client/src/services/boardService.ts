import { api } from './api';
import { IMAGE_FULL_HD } from '../constants';
import { IBoard, IServerMessage, NewBoard } from '../models';

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
      transformResponse: (board: IBoard) => {
        let img = board.image;
        img = img[0] === 'u' ? img.split('?')[0] + IMAGE_FULL_HD + ')' : img;

        return {
          ...board,
          image: img,
        };
      },
    }),
    createBoard: build.mutation<IBoard, NewBoard>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoard: build.mutation<IServerMessage, IBoard>({
      query: ({ id, ...body }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteBoard: build.mutation<IServerMessage, string>({
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
