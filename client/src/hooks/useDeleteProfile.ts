import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../services/userService";
import { resetAuth } from "../store/slices/authSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useErrorHandler } from "./useErrorHandler";

export const useDeleteProfile = (id: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteUser, { isError: deleteProfileError }] = useDeleteUserMutation();

  useErrorHandler(deleteProfileError, 'Unable to delete user');

  return async () => {
    if (!deleteProfileError) {
      dispatch(resetAuth());
      localStorage.clear();
      await deleteUser(id);
      navigate('/login');
    }
  };
}