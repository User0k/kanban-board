import { api } from './api';
import { IServerMessage, IUser, IUsersInTasks } from '../models';

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
    getUsersInTasks: build.query<IUsersInTasks, string[]>({
      query: (ids) => ({
        url: `users-in-tasks?taskIds=${ids}`,
      }),
    }),
    getUsersByIds: build.mutation<IUser[], { ids: string[] }>({
      query: (body) => ({
        url: `users/choose-users`,
        method: 'POST',
        body,
      }),
    }),
    updateUserName: build.mutation<IServerMessage, Pick<IUser, 'id' | 'name'>>({
      query: ({ id, name }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: name,
      }),
    }),
    deleteUser: build.mutation<IServerMessage, string>({
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
  useGetUsersInTasksQuery,
  useGetUsersByIdsMutation,
  useUpdateUserNameMutation,
  useDeleteUserMutation,
} = userService;
