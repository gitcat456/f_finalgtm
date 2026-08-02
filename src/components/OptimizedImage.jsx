import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

/**
 * OptimizedImage component for lazy loading and responsive images
 * Supports AVIF, WebP with JPG/PNG fallback
 */
const OptimizedImage = React.memo(({
  src,
  alt,
  width,
  height,
  className = '',
  sx = {},
  priority = false,
  sizes = '100vw',
  onLoad = () => {},
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad();
  };

  // Helper to safely swap extensions, preserving query strings if any
  const getFormatSrc = (sourceUrl, ext) => {
    if (!sourceUrl || typeof sourceUrl !== 'string') return sourceUrl;
    // Strip query params and hash for extension check, though unlikely in Vite imports
    const basePath = sourceUrl.split('?')[0].split('#')[0];
    if (basePath.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      return sourceUrl.replace(/\.(jpg|jpeg|png|webp|avif)([?#].*)?$/i, `.${ext}$2`);
    }
    return sourceUrl;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: loaded ? 'transparent' : 'rgb(243, 244, 246)', // gray-100
        ...sx,
      }}
      className={`image-container ${className}`}
    >
      <picture>
        {/* AVIF format (prefer this over WebP) */}
        <source 
          srcSet={getFormatSrc(src, 'avif')} 
          type="image/avif"
          sizes={sizes}
        />
        {/* WebP format */}
        <source 
          srcSet={getFormatSrc(src, 'webp')} 
          type="image/webp"
          sizes={sizes}
        />
        {/* Fallback */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0.5,
            transition: 'opacity 0.3s ease-in-out',
          }}
          sizes={sizes}
        />
      </picture>
      
      {/* Loading skeleton */}
      {!loaded && !error && (
        <Box
          className="skeleton"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            opacity: 0.7
          }}
        />
      )}
    </Box>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
