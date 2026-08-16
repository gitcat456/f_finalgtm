import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { NotificationProvider } from '../context/NotificationContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../pages/LoginPage';
import DashboardHome from '../pages/DashboardHome';
import VisitorAnalytics from '../pages/VisitorAnalytics';
import BranchManagement from '../pages/BranchManagement';
import EventManagement from '../pages/EventManagement';
import FounderManagement from '../pages/FounderManagement';
import ClergyManagement from '../pages/ClergyManagement';
import PlaceholderPage from '../pages/PlaceholderPage';

/**
 * AdminRouter — all /admin/* routes.
 * Wrapped in AuthProvider & NotificationProvider so auth & notifications are scoped to admin.
 */
export default function AdminRouter() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          {/* Public admin route */}
          <Route path="login" element={<LoginPage />} />

          {/* Protected admin routes — wrapped in layout */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="visitors" element={<VisitorAnalytics />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="founders" element={<FounderManagement />} />
            <Route path="clergy" element={<ClergyManagement />} />
            <Route
              path="settings"
              element={<PlaceholderPage title="Settings" />}
            />
          </Route>

          {/* Catch-all: redirect unknown admin paths to dashboard */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}
