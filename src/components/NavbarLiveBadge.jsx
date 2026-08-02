import React from 'react';
import { Box, Typography } from '@mui/material';
import { YouTube as YouTubeIcon, Facebook as FacebookIcon, Sensors as SensorsIcon } from '@mui/icons-material';
import useLiveStream from '../hooks/useLiveStream';

/**
 * NavbarLiveBadge
 * 
 * Compact, animated "WE ARE LIVE" indicator badge displayed in the navbar top bar / toolbar.
 */
const NavbarLiveBadge = ({ variant = 'full' }) => {
  const { isLive, platform, streamUrl } = useLiveStream();

  if (!isLive) return null;

  const isYouTube = platform?.toLowerCase() === 'youtube';

  return (
    <Box
      component="a"
      href={streamUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 1.8,
        py: 0.6,
        borderRadius: '50px',
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontWeight: 700,
        boxShadow: '0 0 12px rgba(220, 38, 38, 0.6)',
        transition: 'all 0.3s ease',
        animation: 'navbarLivePulse 2s infinite',
        '@keyframes navbarLivePulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' },
          '70%': { boxShadow: '0 0 0 8px rgba(220, 38, 38, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0)' },
        },
        '&:hover': {
          transform: 'scale(1.04)',
          background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
          color: '#ffffff',
        },
      }}
    >
      {/* Pulsing White Dot */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: '#ffffff',
          animation: 'dotPing 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
          '@keyframes dotPing': {
            '0%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.4, transform: 'scale(1.3)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      />

      <SensorsIcon sx={{ fontSize: 16, color: '#ffffff' }} />

      <Typography
        component="span"
        sx={{
          fontWeight: 800,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        LIVE NOW
      </Typography>

      {/* Platform icon */}
      {isYouTube ? (
        <YouTubeIcon sx={{ fontSize: 16, color: '#ffffff' }} />
      ) : (
        <FacebookIcon sx={{ fontSize: 16, color: '#ffffff' }} />
      )}

      {variant === 'full' && (
        <Typography
          component="span"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            opacity: 0.9,
            display: { xs: 'none', sm: 'inline' },
            borderLeft: '1px solid rgba(255,255,255,0.4)',
            pl: 1,
            ml: 0.5,
          }}
        >
          Watch Stream
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(NavbarLiveBadge);
