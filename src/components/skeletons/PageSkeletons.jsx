/**
 * PageSkeletons.jsx
 *
 * Page-level skeleton screens used as Suspense fallbacks.
 * Each one mirrors the rough structure of its corresponding page
 * so users see the page "shape" immediately.
 */
import React from 'react';
import { SkeletonBox, SkeletonText } from './Skeleton';
import BranchCardSkeleton from './BranchCardSkeleton';

/* ── Home Page Skeleton ───────────────────────────────────────── */

export const HomePageSkeleton = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div
      className="skeleton"
      style={{
        width: '100%',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '42rem', width: '90%', textAlign: 'center' }}>
        <SkeletonBox height="2.5rem" width="85%" borderRadius="0.5rem" style={{ margin: '0 auto 1rem', background: 'rgba(255,255,255,0.12)' }} />
        <SkeletonBox height="1.5rem" width="65%" borderRadius="0.375rem" style={{ margin: '0 auto 0.75rem', background: 'rgba(255,255,255,0.08)' }} />
        <SkeletonBox height="2rem" width="8rem" borderRadius="999px" style={{ margin: '1rem auto 0', background: 'rgba(255,255,255,0.1)' }} />
      </div>
    </div>

    {/* Service Times section header */}
    <div style={{ padding: '4rem 1rem', maxWidth: '72rem', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <SkeletonBox height="2rem" width="14rem" borderRadius="0.375rem" style={{ margin: '0 auto 0.75rem' }} />
        <SkeletonBox height="1rem" width="20rem" borderRadius="0.25rem" style={{ margin: '0 auto 1.5rem' }} />
        <SkeletonBox height="4px" width="6rem" borderRadius="999px" style={{ margin: '0 auto' }} />
      </div>
      {/* Service cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100"
            style={{ padding: '1.5rem', borderLeft: '4px solid #e5e7eb' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
              <SkeletonBox width={52} height={52} borderRadius="0.5rem" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <SkeletonBox height="1rem" width="70%" borderRadius="0.25rem" />
                <SkeletonBox height="0.75rem" width="50%" borderRadius="0.25rem" />
              </div>
            </div>
            <SkeletonText lines={2} lineHeight="0.625rem" lastWidth="80%" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Locations Page Skeleton ──────────────────────────────────── */

export const LocationsPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8">
    {/* Hero */}
    <div
      className="skeleton"
      style={{
        width: '100%',
        height: '18rem',
        borderRadius: '0 0 1.5rem 1.5rem',
        marginBottom: '3rem',
      }}
    />

    {/* Section header */}
    <div className="content-container pb-16">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <SkeletonBox height="2rem" width="14rem" borderRadius="0.375rem" style={{ margin: '0 auto 0.75rem' }} />
        <SkeletonBox height="1rem" width="24rem" borderRadius="0.25rem" style={{ margin: '0 auto', maxWidth: '90%' }} />
      </div>

      {/* Branch cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <BranchCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

/* ── Events Page Skeleton ─────────────────────────────────────── */

export const EventsPageSkeleton = () => (
  <div className="section-container bg-gray-50/50 min-h-screen pt-8">
    <div className="content-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <SkeletonBox height="2.5rem" width="16rem" borderRadius="0.375rem" style={{ margin: '0 auto 0.75rem' }} />
        <SkeletonBox height="1rem" width="22rem" borderRadius="0.25rem" style={{ margin: '0 auto', maxWidth: '90%' }} />
      </div>

      {/* Event card skeleton - big centered card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden" style={{ maxWidth: '58rem', margin: '0 auto' }}>
        {/* Image */}
        <SkeletonBox height="auto" borderRadius="0" style={{ aspectRatio: '21 / 9', width: '100%' }} />
        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <SkeletonBox width={80} height={24} borderRadius="999px" />
            <SkeletonBox width={100} height={24} borderRadius="999px" />
          </div>
          <SkeletonBox height="1.75rem" width="60%" borderRadius="0.375rem" style={{ marginBottom: '0.75rem' }} />
          <SkeletonBox height="1rem" width="40%" borderRadius="0.25rem" style={{ marginBottom: '1.5rem' }} />
          <SkeletonText lines={4} lineHeight="0.75rem" />
        </div>
      </div>

      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
        {[1, 2, 3].map((i) => (
          <SkeletonBox key={i} width={120} height={38} borderRadius="999px" />
        ))}
      </div>
    </div>
  </div>
);

/* ── About Page Skeleton ──────────────────────────────────────── */

export const AboutPageSkeleton = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div
      className="skeleton"
      style={{
        width: '100%',
        height: '22rem',
        borderRadius: '0 0 1.5rem 1.5rem',
      }}
    />
    <div style={{ padding: '4rem 1rem', maxWidth: '60rem', margin: '0 auto' }}>
      <SkeletonBox height="2rem" width="12rem" borderRadius="0.375rem" style={{ marginBottom: '1rem' }} />
      <SkeletonText lines={6} lineHeight="0.875rem" gap="0.75rem" lastWidth="45%" />
      <div style={{ marginTop: '3rem' }}>
        <SkeletonBox height="2rem" width="10rem" borderRadius="0.375rem" style={{ marginBottom: '1rem' }} />
        <SkeletonText lines={4} lineHeight="0.875rem" gap="0.75rem" lastWidth="55%" />
      </div>
    </div>
  </div>
);

/* ── Generic Fallback (for NotFound, Socials, etc.) ───────────── */

export const GenericPageSkeleton = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <SkeletonBox width={64} height={64} borderRadius="1rem" style={{ marginBottom: '1.5rem' }} />
    <SkeletonBox height="1.5rem" width="14rem" borderRadius="0.375rem" style={{ marginBottom: '0.75rem' }} />
    <SkeletonBox height="1rem" width="20rem" borderRadius="0.25rem" />
  </div>
);

/* ── Admin Page Skeleton (Branches / Events management) ───────── */

export const AdminManagementSkeleton = ({ cardCount = 6 }) => (
  <div className="admin-page-container">
    {/* Page header */}
    <div className="admin-page-header" style={{ pointerEvents: 'none' }}>
      <div>
        <SkeletonBox height="1.5rem" width="14rem" borderRadius="0.375rem" style={{ marginBottom: '0.5rem' }} />
        <SkeletonBox height="0.875rem" width="24rem" borderRadius="0.25rem" style={{ maxWidth: '100%' }} />
      </div>
      <SkeletonBox width={120} height={38} borderRadius="0.5rem" />
    </div>

    {/* Toolbar / Search */}
    <div className="admin-toolbar" style={{ pointerEvents: 'none' }}>
      <SkeletonBox height="2.5rem" borderRadius="0.625rem" style={{ maxWidth: '24rem' }} />
      <SkeletonBox height="1rem" width="8rem" borderRadius="0.25rem" />
    </div>

    {/* Cards grid */}
    <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: cardCount }).map((_, i) => (
        <BranchCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
