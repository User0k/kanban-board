import LazyBoardPage from '../pages/BoardPage';
import LazyLoginPage from '../pages/LoginPage';
import LazyMainPage from '../pages/MainPage';
import LazyPageNotFound from '../pages/PageNotFound';
import LazyRegisterPage from '../pages/RegisterPage';
import LazyProfilePage from '../pages/ProfilePage';

enum RoutePaths {
  MAin = '/boards',
  BOARD_PAGE = '/boards/:boardId',
  REGISTER = '/register',
  LOGIN = '/login',
  PROFILE = '/profile',
  NOT_FOUND = '*',
}

interface IRoute {
  path: RoutePaths;
  element: JSX.Element;
  private?: boolean;
  redirectIfLogin?: boolean;
}

export const appRoutes: IRoute[] = [
  { path: RoutePaths.MAin, element: <LazyMainPage />, private: true },
  { path: RoutePaths.BOARD_PAGE, element: <LazyBoardPage />, private: true },
  {
    path: RoutePaths.REGISTER,
    element: <LazyRegisterPage />,
    redirectIfLogin: true,
  },
  { path: RoutePaths.LOGIN, element: <LazyLoginPage />, redirectIfLogin: true },
  { path: RoutePaths.PROFILE, element: <LazyProfilePage />, private: true },
  { path: RoutePaths.NOT_FOUND, element: <LazyPageNotFound /> },
];
