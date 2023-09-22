import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCheckAuthQuery } from './services/authService';
import GlobalSpinner from './components/Spinners/GlobalSpinner';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const accessToken = localStorage.getItem('accessToken') ?? '';
  const {
    data: authResponse,
    isLoading: isChecking,
    refetch: checkAuth,
  } = useCheckAuthQuery(accessToken);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await checkAuth();
    };

    fetchData();
  }, [location.pathname, checkAuth]);

  if (isChecking) {
    return <GlobalSpinner />;
  } else if (authResponse) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
