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
const NotFound = lazy(() => import('../pages/NotFound'));

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
        <Route 
          path="*" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          } 
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
