// src/components/layout/Layout.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';  // ✅ IMPORT OUTLET
import Navbar from './navbar';
import Footer from './footer';

const Layout = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Navbar />
      <Box component="main" sx={{ 
        flexGrow: 1,
        py: 4, 
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Outlet /> {/* ✅ USE OUTLET INSTEAD OF CHILDREN */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
