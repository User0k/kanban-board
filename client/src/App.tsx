import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';
import PageNotFound from './pages/PageNotFound';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="boards" element={<MainPage />} />
          <Route path="boards/:boardId" element={<BoardPage />} />
          <Route path="auth" element={<WelcomePage />} />
          <Route path="login" element={<WelcomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
