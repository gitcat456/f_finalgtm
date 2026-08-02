import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/layout';

// Page-specific skeleton fallbacks — replaces the generic LoadingSpinner
import {
  HomePageSkeleton,
  EventsPageSkeleton,
  AboutPageSkeleton,
  LocationsPageSkeleton,
  GenericPageSkeleton,
} from '../components/skeletons/PageSkeletons';

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home'));
const Events = lazy(() => import('../pages/Events'));
const AboutPage = lazy(() => import('../pages/About'));
const BranchesPage = lazy(() => import('../pages/Locations'));
const SocialsPage = lazy(() => import('../pages/Socials'));
const MediaControl = lazy(() => import('../pages/MediaControl'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Lazy load admin module — completely code-split from public site
const AdminRouter = lazy(() => import('../admin/routes/AdminRouter'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public website routes */}
      <Route path="/" element={<Layout />}>
        <Route 
          index 
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <Home />
            </Suspense>
          } 
        />
        <Route 
          path="events" 
          element={
            <Suspense fallback={<EventsPageSkeleton />}>
              <Events />
            </Suspense>
          } 
        />
        <Route 
          path="about" 
          element={
            <Suspense fallback={<AboutPageSkeleton />}>
              <AboutPage />
            </Suspense>
          } 
        />
        <Route 
          path="locations" 
          element={
            <Suspense fallback={<LocationsPageSkeleton />}>
              <BranchesPage />
            </Suspense>
          } 
        />
        <Route 
          path="gtm_socials" 
          element={
            <Suspense fallback={<GenericPageSkeleton />}>
              <SocialsPage />
            </Suspense>
          } 
        />
        <Route 
          path="media-control" 
          element={
            <Suspense fallback={<GenericPageSkeleton />}>
              <MediaControl />
            </Suspense>
          } 
        />
        <Route 
          path="*" 
          element={
            <Suspense fallback={<GenericPageSkeleton />}>
              <NotFound />
            </Suspense>
          } 
        />
      </Route>

      {/* Admin dashboard — completely separate from public layout */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<GenericPageSkeleton />}>
            <AdminRouter />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
