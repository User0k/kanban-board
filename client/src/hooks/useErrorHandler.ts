import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { clearError, setError } from '../store/slices/errorSlice';

export const useErrorHandler = (isError: boolean, errorMessage = 'server error') => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      dispatch(setError(errorMessage));
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  }, [isError, errorMessage, dispatch]);
}
