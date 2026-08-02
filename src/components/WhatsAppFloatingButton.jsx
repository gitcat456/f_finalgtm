import React from 'react';
import { Box, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

/**
 * WhatsAppFloatingButton
 * 
 * Reusable floating button that appears fixed at the bottom right corner of the screen.
 * Clicking opens a direct WhatsApp chat with GTM Church pre-filled message.
 */
const PHONE_NUMBER = '254745116087';
const DEFAULT_MESSAGE = 'Hello GTM Church, I would like to connect with you.';
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

const WhatsAppFloatingButton = () => {
  return (
    <Box
      component="a"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect with us on WhatsApp"
      sx={{
        position: 'fixed',
        bottom: { xs: 20, sm: 24 },
        right: { xs: 20, sm: 24 },
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        padding: { xs: '10px 14px', sm: '12px 18px' },
        borderRadius: '50px',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
          backgroundColor: '#20ba5a',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.6), 0 4px 10px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-3px) scale(1.03)',
          color: '#FFFFFF',
        },
        '&:active': {
          transform: 'translateY(-1px) scale(0.98)',
        },
      }}
    >
      <WhatsAppIcon 
        sx={{ 
          fontSize: { xs: 22, sm: 26 },
          color: '#FFFFFF',
          animation: 'whatsappPulse 2.5s infinite',
          '@keyframes whatsappPulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.12)' },
            '100%': { transform: 'scale(1)' },
          },
        }} 
      />
      <Typography
        variant="button"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '0.825rem', sm: '0.9rem' },
          letterSpacing: '0.01em',
          textTransform: 'none',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
        }}
      >
        Connect with us
      </Typography>
    </Box>
  );
};

export default React.memo(WhatsAppFloatingButton);
