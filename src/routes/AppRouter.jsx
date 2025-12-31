import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/layout';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home'));
const Events = lazy(() => import('../pages/Events'));
const AboutPage = lazy(() => import('../pages/About'));
const BranchesPage = lazy(() => import('../pages/Locations'));
const SocialsPage = lazy(() => import('../pages/Socials'));

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-indigo-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600">Page Not Found</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route 
          index 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          } 
        />
        <Route 
          path="events" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Events />
            </Suspense>
          } 
        />
        <Route 
          path="about" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AboutPage />
            </Suspense>
          } 
        />
        <Route 
          path="locations" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <BranchesPage />
            </Suspense>
          } 
        />
        <Route 
          path="gtm_socials" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SocialsPage />
            </Suspense>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
