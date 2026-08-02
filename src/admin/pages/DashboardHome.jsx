import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { branchService } from '../services/branchService';
import { eventService } from '../services/eventService';
import DashboardHomeSkeleton from '../../components/skeletons/DashboardHomeSkeleton';
import { FadeIn } from '../../components/skeletons/Skeleton';

import LocationCityIcon from '@mui/icons-material/LocationCityOutlined';
import EventIcon from '@mui/icons-material/EventOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';

export default function DashboardHome() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [branchCount, setBranchCount] = useState('—');
  const [eventCount, setEventCount] = useState('—');
  const [pastorCount, setPastorCount] = useState('—');

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const [branchesRes, eventsRes] = await Promise.allSettled([
          branchService.getAllBranches(),
          eventService.getAllEvents(),
        ]);

        if (branchesRes.status === 'fulfilled' && Array.isArray(branchesRes.value)) {
          const branches = branchesRes.value;
          setBranchCount(branches.length);
          const totalPastors = branches.reduce(
            (acc, b) => acc + (b.pastors?.length || 0),
            0
          );
          setPastorCount(totalPastors);
        } else {
          setBranchCount('0');
          setPastorCount('0');
        }

        if (eventsRes.status === 'fulfilled' && Array.isArray(eventsRes.value)) {
          setEventCount(eventsRes.value.length);
        } else {
          setEventCount('0');
        }
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const stats = [
    {
      label: 'Branches',
      value: branchCount,
      iconClass: 'branches',
      icon: LocationCityIcon,
    },
    {
      label: 'Events',
      value: eventCount,
      iconClass: 'events',
      icon: EventIcon,
    },
    {
      label: 'Clergy / Pastors',
      value: pastorCount,
      iconClass: 'clergy',
      icon: PeopleIcon,
    },
    {
      label: 'System Admin',
      value: user?.username || 'Admin',
      iconClass: 'users',
      icon: PersonIcon,
    },
  ];

  const quickActions = [
    { label: 'Manage Branches', path: '/admin/branches', icon: LocationCityIcon },
    { label: 'Manage Events', path: '/admin/events', icon: EventIcon },
  ];

  if (loading) {
    return <DashboardHomeSkeleton />;
  }

  return (
    <FadeIn>
      {/* Welcome banner */}
      <div className="admin-welcome-card">
        <h2>Welcome back, {user?.username || 'Admin'} 👋</h2>
        <p>
          Here is an overview of your church management dashboard. Manage your branches,
          pastors, and upcoming events with real-time updates.
        </p>
      </div>

      {/* Stats grid */}
      <div className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-card-header">
                <div className={`admin-stat-card-icon ${stat.iconClass}`}>
                  <Icon />
                </div>
              </div>
              <div className="admin-stat-card-label">{stat.label}</div>
              <div className="admin-stat-card-value">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="admin-quick-actions">
        <h3>Quick Actions</h3>
        <div className="admin-quick-actions-grid">
          {quickActions.map((action) => {
            return (
              <Link
                key={action.label}
                to={action.path}
                className="admin-quick-action-btn"
              >
                <AddIcon fontSize="small" style={{ opacity: 0.6 }} />
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}
