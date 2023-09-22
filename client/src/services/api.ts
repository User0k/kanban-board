import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken && endpoint !== 'refresh') {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Board', 'Column', 'Task', 'User'],
});
