/**
 * HeroSkeleton.jsx
 *
 * A generic full-width hero/banner skeleton for use in
 * Locations, Events, and any other public page that loads
 * with a large hero section.
 */
import React from 'react';
import { SkeletonBox } from './Skeleton';

const HeroSkeleton = ({ height = '20rem' }) => (
  <div
    className="skeleton"
    style={{
      width: '100%',
      height,
      borderRadius: '0 0 1.5rem 1.5rem',
      marginBottom: '3rem',
    }}
  />
);

export default HeroSkeleton;
