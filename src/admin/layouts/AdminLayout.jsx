import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import '../styles/admin.css';

/**
 * AdminLayout — wraps all authenticated admin pages.
 * Provides sidebar + topnav + content area with responsive toggle.
 */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-root">
      <div className="admin-layout">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="admin-main">
          <TopNav onToggleSidebar={toggleSidebar} />
          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
