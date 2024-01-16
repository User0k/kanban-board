import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';
import Layout from './components/Layout';
import PrivateRoute from './routes/PrivateRoute';
import RedirectRoute from './routes/RedirectRoute';
import LazyWelcomePage from './pages/WelcomePage';
import './global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LazyWelcomePage />} />
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.private ? (
                  <PrivateRoute>{route.element}</PrivateRoute>
                ) : route.redirectIfLogin ? (
                  <RedirectRoute>{route.element}</RedirectRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
