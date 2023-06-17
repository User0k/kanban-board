import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthResponse } from "../models";
import { setIsLoggedIn, setUser } from "../store/slices/authSlice";
import { useAppDispatch } from "./useAppDispatch";

function useLogin(data: IAuthResponse | undefined) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const { accessToken, user } = data;
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem('accessToken', accessToken);
      navigate('/boards');
    }
  }, [data, dispatch, navigate]);
}

export default useLogin;
