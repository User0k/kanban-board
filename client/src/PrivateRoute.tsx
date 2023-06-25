import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setIsLoggedIn, setUser } from './store/slices/authSlice';
import { useRefreshQuery } from './services/authService';
import GlobalSpinner from './components/Spinners/GlobalSpinner';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { data: authResponse, isLoading: isChecking } = useRefreshQuery();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('accessToken') && authResponse) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(authResponse.user));
    }
  }, [authResponse, dispatch]);

  if (isChecking) {
    return <GlobalSpinner />;
  } else if (authResponse) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
