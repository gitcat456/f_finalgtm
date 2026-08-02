import { NavLink, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCityOutlined';
import EventIcon from '@mui/icons-material/EventOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

const navSections = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', path: '/admin', icon: DashboardIcon, end: true },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Branches', path: '/admin/branches', icon: LocationCityIcon },
      { label: 'Events', path: '/admin/events', icon: EventIcon },
      { label: 'Clergy', path: '/admin/clergy', icon: PeopleIcon },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', path: '/admin/settings', icon: SettingsIcon },
    ],
  },
];

/**
 * Sidebar — persistent navigation for the admin dashboard.
 * `isOpen` controls mobile visibility, `onClose` closes the mobile overlay.
 */
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-icon">G</div>
          <div>
            <h2>GTM Admin</h2>
            <span>Church Management</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {navSections.map((section) => (
            <div key={section.title} className="admin-sidebar-section">
              <div className="admin-sidebar-section-title">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.end
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon className="nav-icon" fontSize="small" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-nav-item" style={{ cursor: 'default', opacity: 0.4, fontSize: '0.75rem' }}>
            GTM v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
}
