import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/admin.css';

/**
 * Admin Login Page — standalone (no sidebar/topnav layout).
 */
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after successful login
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-root">
      <div className="admin-login-bg">
        <div className="admin-login-card">
{/* Logo mark */}
<div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
  <img
    src="https://res.cloudinary.com/dyy3aepmu/image/upload/f_auto,q_auto,c_limit,w_300/v1785606828/off_logo_dz4tio.png"
    alt="Logo"
    style={{
      width: 56,
      height: 56,
      margin: '0 auto 0.75rem',
      display: 'block',
      borderRadius: '1rem',
      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
      objectFit: 'cover',
    }}
  />
</div>

          <h1>Welcome Back</h1>
          <p className="login-subtitle">Sign in to the GTM Admin Dashboard</p>

          {error && <div className="admin-login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <label htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="admin-input-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={submitting}
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
