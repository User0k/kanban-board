import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useErrorHandler } from './useErrorHandler';
import { useUpdateUserMutation } from '../services/userService';
import { setUser } from '../store/slices/authSlice';
import { useTranslation } from './useTranslation';

interface IFormValues {
  name: string;
  email: string;
}

export const useUpdateProfile = (id: string, onCloseFn: () => void) => {
  const [
    updateProfile,
    {
      data: updatedUser,
      isLoading: isProfileUpdating,
      isError: updateProfileError,
    },
  ] = useUpdateUserMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updatedUser && !isProfileUpdating) {
      dispatch(setUser(updatedUser));
    }
  }, [dispatch, isProfileUpdating, updatedUser]);

  const t = useTranslation('profilePage');
  useErrorHandler(updateProfileError, t?.updateError);

  return async (data: IFormValues) => {
    await updateProfile({ id, ...data });
    onCloseFn();
  };
};
