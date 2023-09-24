import { useEffect } from 'react';
import { useRefreshQuery } from '../services/authService';
import { setIsLoggedIn, setUser } from '../store/slices/authSlice';
import { useAppDispatch } from './useAppDispatch';

export const useFirstLoad = () => {
  const dispatch = useAppDispatch();
  const { data: userResponse = undefined, isLoading: isRefreshing } =
    useRefreshQuery();

  useEffect(() => {
    if (!userResponse && !isRefreshing) return;

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isRefreshing && userResponse) {
      localStorage.setItem('accessToken', userResponse.accessToken);
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(userResponse.user));
    }
  }, [isRefreshing, userResponse, dispatch]);
};
