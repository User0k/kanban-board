import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { clearError, setError } from '../store/slices/errorSlice';

export function UseErrorHandler(error: boolean, errorMessage: string) {
  const dispatch = useAppDispatch();
  if (error) {
    error = false;
    dispatch(setError(errorMessage));
    setTimeout(() => dispatch(clearError()), 2000);
  }
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
