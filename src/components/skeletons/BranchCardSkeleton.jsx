/**
 * BranchCardSkeleton.jsx
 *
 * Mimics the BranchCard layout exactly:
 *  - Image banner (aspect-ratio 16/9)
 *  - Name + location
 *  - Service schedule row
 *  - Leadership section (2 pastor rows with avatar)
 *  - "View on Map" button
 */
import React from 'react';
import { SkeletonBox, SkeletonCircle, SkeletonText } from './Skeleton';

const BranchCardSkeleton = () => (
  <div
    className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {/* Banner image placeholder */}
    <SkeletonBox
      height="auto"
      borderRadius="0"
      style={{ aspectRatio: '16 / 9', width: '100%' }}
    />

    {/* Card body */}
    <div style={{ padding: '1.25rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
      {/* Branch name */}
      <SkeletonBox height="1.25rem" width="65%" borderRadius="0.375rem" />

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SkeletonCircle size={16} />
        <SkeletonBox height="0.75rem" width="50%" borderRadius="0.25rem" />
      </div>

      {/* Service schedule row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SkeletonCircle size={16} />
        <SkeletonBox height="0.75rem" width="60%" borderRadius="0.25rem" />
      </div>

      {/* Leadership heading */}
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem', marginTop: '0.25rem' }}>
        <SkeletonBox height="0.625rem" width="30%" borderRadius="0.25rem" style={{ marginBottom: '1rem' }} />

        {/* Pastor 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <SkeletonCircle size={48} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <SkeletonBox height="0.75rem" width="55%" borderRadius="0.25rem" />
            <SkeletonBox height="0.625rem" width="40%" borderRadius="0.25rem" />
          </div>
        </div>

        {/* Pastor 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SkeletonCircle size={48} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <SkeletonBox height="0.75rem" width="50%" borderRadius="0.25rem" />
            <SkeletonBox height="0.625rem" width="35%" borderRadius="0.25rem" />
          </div>
        </div>
      </div>

      {/* View on Map button placeholder */}
      <SkeletonBox height="2.75rem" borderRadius="0.75rem" style={{ marginTop: '0.5rem' }} />
    </div>
  </div>
);

export default BranchCardSkeleton;
