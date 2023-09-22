import { api } from './api';
import { IUserFields, IAuthResponse, IServerMessage } from '../models';

export const authService = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<IAuthResponse, IUserFields>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<IAuthResponse, Omit<IUserFields, 'name'>>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<IServerMessage, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    refresh: build.query<IAuthResponse, void>({
      query: () => ({
        url: 'refresh',
      }),
    }),
    checkAuth: build.query<string, string>({
      query: () => ({
        url: '/checkAuth',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshQuery,
  useCheckAuthQuery,
} = authService;
