import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Box sx={{ textAlign: 'center', color: 'white' }}>
        <CircularProgress 
          size={60} 
          sx={{ color: 'white', mb: 2 }}
        />
        <p className="text-lg font-semibold">Loading...</p>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
