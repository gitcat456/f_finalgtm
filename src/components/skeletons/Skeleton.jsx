/**
 * Skeleton.jsx — Base skeleton primitives
 *
 * Building blocks for all skeleton loaders.
 * Uses the existing `.skeleton` CSS class (shimmer animation) from index.css.
 */
import React from 'react';

/* ── Primitive shapes ───────────────────────────────────────────── */

export const SkeletonBox = ({
  width,
  height,
  borderRadius = '0.5rem',
  className = '',
  style = {},
}) => (
  <div
    className={`skeleton ${className}`}
    style={{
      width: width ?? '100%',
      height: height ?? '1rem',
      borderRadius,
      flexShrink: 0,
      ...style,
    }}
  />
);

export const SkeletonCircle = ({ size = 48, className = '', style = {} }) => (
  <SkeletonBox
    width={size}
    height={size}
    borderRadius="50%"
    className={className}
    style={style}
  />
);

export const SkeletonText = ({
  lines = 3,
  gap = '0.5rem',
  lastWidth = '60%',
  lineHeight = '0.75rem',
  className = '',
}) => (
  <div className={className} style={{ display: 'flex', flexDirection: 'column', gap }}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBox
        key={i}
        height={lineHeight}
        width={i === lines - 1 ? lastWidth : '100%'}
        borderRadius="0.25rem"
      />
    ))}
  </div>
);

/* ── Fade-in wrapper ────────────────────────────────────────────── */

/**
 * Wraps children in a CSS fade-in transition.
 * Use this to replace skeleton → real content smoothly.
 *
 *   {loading ? <MySkeleton /> : <FadeIn><RealContent /></FadeIn>}
 */
export const FadeIn = ({ children, duration = 400, className = '' }) => (
  <div
    className={className}
    style={{
      animation: `skeletonFadeIn ${duration}ms ease-out`,
    }}
  >
    {children}
  </div>
);

export default SkeletonBox;
