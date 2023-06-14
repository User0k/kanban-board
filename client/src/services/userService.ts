import { api } from './api';
import { IUser } from '../models';

export const userService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: 'users/',
        method: 'GET',
      })
    }),
    getUser: build.query<IUser, void>({
      query: () => ({
        url: 'users/:id',
        method: 'GET',
      })
    }),
    updateUserName: build.mutation<IUser, Pick<IUser, 'name'>>({
      query: (body) => ({
        url: 'users/:id',
        method: 'PATCH',
        body
      })
    }),
    deleteUser: build.mutation<IUser, void>({
      query: () => ({
        url: 'users/:id',
        method: 'DELETE',
      })
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useUpdateUserNameMutation,
  useDeleteUserMutation
} = userService;
