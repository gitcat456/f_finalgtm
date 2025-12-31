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

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: loaded ? 'transparent' : 'rgb(229, 231, 235)',
        ...sx,
      }}
      className={className}
    >
      <picture>
        {/* WebP format */}
        <source 
          srcSet={src.replace(/\.(jpg|png)$/, '.webp')} 
          type="image/webp"
          sizes={sizes}
        />
        {/* AVIF format */}
        <source 
          srcSet={src.replace(/\.(jpg|png)$/, '.avif')} 
          type="image/avif"
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
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            },
          }}
        />
      )}
    </Box>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
