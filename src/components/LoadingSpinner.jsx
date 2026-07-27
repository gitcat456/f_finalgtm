import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          size={50} 
          thickness={4}
          sx={{ color: '#4f46e5', mb: 2 }} // tailwind primary-600
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#4f46e5',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
