import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

/**
 * TopNav — sticky top bar with sidebar toggle, page title, user info, and logout.
 */
export default function TopNav({ title, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const initials = user?.username
    ? user.username.charAt(0).toUpperCase()
    : 'A';

  return (
    <header className="admin-topnav">
      <div className="admin-topnav-left">
        <button
          className="admin-topnav-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <MenuIcon fontSize="small" />
        </button>
        <div className="admin-topnav-title">{title || 'Dashboard'}</div>
      </div>

      <div className="admin-topnav-right">
        <div className="admin-topnav-user">
          <div className="admin-topnav-avatar">{initials}</div>
          <span>{user?.username || 'Admin'}</span>
        </div>
        <button
          className="admin-topnav-logout"
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
        >
          <LogoutIcon fontSize="small" />
        </button>
      </div>
    </header>
  );
}
