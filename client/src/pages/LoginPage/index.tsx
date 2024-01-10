import { lazy } from 'react';

const LazyLoginPage = lazy(() => import('./LoginPage'));
export default LazyLoginPage;
