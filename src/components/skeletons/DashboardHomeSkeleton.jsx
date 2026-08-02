/**
 * DashboardHomeSkeleton.jsx
 *
 * Mimics the DashboardHome layout:
 *  - Welcome banner
 *  - 4 stat cards
 *  - Quick actions section
 */
import React from 'react';
import { SkeletonBox, SkeletonText } from './Skeleton';

const StatCardSkeleton = () => (
  <div className="admin-stat-card" style={{ pointerEvents: 'none' }}>
    <div className="admin-stat-card-header">
      <SkeletonBox width={44} height={44} borderRadius="0.75rem" />
    </div>
    <SkeletonBox height="0.75rem" width="50%" borderRadius="0.25rem" style={{ marginBottom: '0.5rem' }} />
    <SkeletonBox height="2rem" width="40%" borderRadius="0.375rem" />
  </div>
);

const DashboardHomeSkeleton = () => (
  <>
    {/* Welcome banner */}
    <div className="admin-welcome-card" style={{ pointerEvents: 'none' }}>
      <SkeletonBox
        height="1.5rem"
        width="55%"
        borderRadius="0.375rem"
        style={{ marginBottom: '0.75rem', background: 'rgba(255,255,255,0.15)' }}
      />
      <SkeletonBox
        height="0.875rem"
        width="80%"
        borderRadius="0.25rem"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      />
    </div>

    {/* Stats grid */}
    <div className="admin-stats-grid">
      {[1, 2, 3, 4].map((i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Quick actions */}
    <div className="admin-quick-actions" style={{ pointerEvents: 'none' }}>
      <SkeletonBox height="1rem" width="30%" borderRadius="0.375rem" style={{ marginBottom: '1rem' }} />
      <div className="admin-quick-actions-grid">
        <SkeletonBox height="2.75rem" borderRadius="0.625rem" />
        <SkeletonBox height="2.75rem" borderRadius="0.625rem" />
      </div>
    </div>
  </>
);

export default DashboardHomeSkeleton;
