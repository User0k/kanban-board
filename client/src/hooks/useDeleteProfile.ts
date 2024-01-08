import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from '../services/userService';
import { resetAuth } from '../store/slices/authSlice';
import { useAppDispatch } from './useAppDispatch';
import { useErrorHandler } from './useErrorHandler';
import { useTranslation } from './useTranslation';

export const useDeleteProfile = (id: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteUser, { isError: deleteProfileError }] = useDeleteUserMutation();

  const t = useTranslation('profilePage');
  useErrorHandler(deleteProfileError, t?.deleteError);

  return async () => {
    if (!deleteProfileError) {
      dispatch(resetAuth());
      localStorage.clear();
      await deleteUser(id);
      navigate('/login');
    }
  };
};
