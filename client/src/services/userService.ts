import { api } from './api';
import { AssignedUser, IServerMessage, IUser, IUsersInTasks } from '../models';

export const userService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<AssignedUser[], void>({
      query: () => ({
        url: 'users/',
      }),
      providesTags: ['User'],
    }),
    getUser: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: ['User'],
    }),
    getUsersInTasks: build.query<IUsersInTasks, string[]>({
      query: (ids) => ({
        url: `users-in-tasks?taskIds=${ids}`,
      }),
      providesTags: ['User'],
    }),
    getUsersByIds: build.mutation<IUser[], { ids: string[] }>({
      query: (body) => ({
        url: `users/choose-users`,
        method: 'POST',
        body,
      }),
    }),
    updateUser: build.mutation<IUser, Pick<IUser, 'id' | 'name' | 'email'>>({
      query: ({ id, name, email }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: { name, email },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation<IServerMessage, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    assignUser: build.mutation<IServerMessage, { id: string; taskId: string }>({
      query: ({ id, ...body }) => ({
        url: `users/${id}/assign`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    unassignUser: build.mutation<
      IServerMessage,
      { id: string; taskId: string }
    >({
      query: ({ id, ...body }) => ({
        url: `users/${id}/assign`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetUsersInTasksQuery,
  useGetUsersByIdsMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignUserMutation,
  useUnassignUserMutation,
} = userService;
