import { api } from './api';
import { IUser, IUsersInTasks } from '../models';

export const userService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: 'users/',
      }),
    }),
    getUser: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    getAssignedUsers: build.query<IUsersInTasks, string>({
      query: (boardId) => ({
        url: `boards/${boardId}/users`,
      }),
    }),
    updateUserName: build.mutation<IUser, Pick<IUser, 'id' | 'name'>>({
      query: (id, ...body) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteUser: build.mutation<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetAssignedUsersQuery,
  useUpdateUserNameMutation,
  useDeleteUserMutation,
} = userService;
