import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { resetAuth } from '../store/slices/authSlice';
import { IAuthResponse } from '../models';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { endpoint }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && endpoint !== 'refresh') {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.meta?.response?.status === 401 &&
    result.meta.response.url.includes('/checkAuth')
  ) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    const response = refreshResult.data as IAuthResponse;
    if (response) {
      localStorage.setItem('accessToken', response.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuth());
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  return result;
};
