import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';

/**
 * ProtectedRoute — wraps admin routes that require authentication.
 * Shows a loading spinner while verifying the token, then either
 * renders children or redirects to the admin login page.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f8fafc',
        }}
      >
        <CircularProgress size={44} thickness={4} sx={{ color: '#4f46e5' }} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Preserve the intended destination so we can redirect after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
