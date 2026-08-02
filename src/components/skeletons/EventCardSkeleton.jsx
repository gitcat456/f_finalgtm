/**
 * EventCardSkeleton.jsx
 *
 * Mimics the admin EventManagement card layout:
 *  - Image area with status pill
 *  - Title + subtitle
 *  - Date row
 *  - Scripture row
 *  - Schedule box
 *  - Action footer
 */
import React from 'react';
import { SkeletonBox } from './Skeleton';

const EventCardSkeleton = () => (
  <div
    className="admin-event-card"
    style={{ pointerEvents: 'none' }}
  >
    {/* Image area */}
    <div className="event-card-media" style={{ position: 'relative' }}>
      <SkeletonBox
        height="auto"
        borderRadius="0"
        style={{ aspectRatio: '16 / 9', width: '100%' }}
      />
      {/* Status pill skeleton */}
      <SkeletonBox
        width={60}
        height={22}
        borderRadius="999px"
        style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}
      />
    </div>

    {/* Content */}
    <div className="event-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {/* Title */}
      <SkeletonBox height="1.125rem" width="75%" borderRadius="0.375rem" />
      {/* Subtitle */}
      <SkeletonBox height="0.75rem" width="50%" borderRadius="0.25rem" />

      {/* Date row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
        <SkeletonBox width={18} height={18} borderRadius="0.25rem" />
        <SkeletonBox height="0.75rem" width="55%" borderRadius="0.25rem" />
      </div>

      {/* Scripture row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SkeletonBox width={18} height={18} borderRadius="0.25rem" />
        <SkeletonBox height="0.75rem" width="40%" borderRadius="0.25rem" />
      </div>

      {/* Schedule box */}
      <SkeletonBox height={60} borderRadius="0.5rem" style={{ marginTop: '0.25rem' }} />
    </div>

    {/* Footer */}
    <div className="event-card-footer" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
      <SkeletonBox width={70} height={32} borderRadius="0.5rem" />
      <SkeletonBox width={60} height={32} borderRadius="0.5rem" />
      <SkeletonBox width={74} height={32} borderRadius="0.5rem" />
    </div>
  </div>
);

export default EventCardSkeleton;
