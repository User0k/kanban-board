import { Navigate } from 'react-router-dom';
import GlobalSpinner from '../components/Spinners/GlobalSpinner';
import { useAppSelector } from '../hooks/useAppSelector';
import { useRefreshQuery } from '../services/authService';

function RedirectRoute({ children }: { children: JSX.Element }) {
  const { isLoading: isGettingUser } = useRefreshQuery();
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);

  if (isGettingUser) {
    return <GlobalSpinner />;
  } else if (!isLoggedIn) {
    return children;
  }

  return <Navigate to="/boards" replace />;
}

export default RedirectRoute;
