import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './PrivateRoute';
import RedirectRoute from './RedirectRoute';
import LazyBoardPage from './pages/BoardPage';
import LazyLoginPage from './pages/LoginPage';
import LazyMainPage from './pages/MainPage';
import LazyPageNotFound from './pages/PageNotFound';
import LazyRegisterPage from './pages/RegisterPage';
import LazyWelcomePage from './pages/WelcomePage';
import LazyProfilePage from './pages/ProfilePage';
import './global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LazyWelcomePage />} />
          <Route
            path="/boards"
            element={
              <PrivateRoute>
                <LazyMainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/boards/:boardId"
            element={
              <PrivateRoute>
                <LazyBoardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectRoute>
                <LazyRegisterPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectRoute>
                <LazyLoginPage />
              </RedirectRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <LazyProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<LazyPageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
