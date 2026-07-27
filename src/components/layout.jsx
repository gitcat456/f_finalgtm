/**
 * Layout.jsx — Root shell component
 *
 * Architecture:
 *  - Renders Navbar + Footer around the active page via React Router's <Outlet>.
 *  - Deliberately has NO padding on the <main> element — each page owns its
 *    own spacing. Adding layout-level padding forces every page to fight it.
 *  - id="main-content" on <main> matches the skip-link in index.html.
 */
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const Layout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <Box
      component="main"
      id="main-content"
      sx={{ flexGrow: 1 }}
    >
      <Outlet />
    </Box>
    <Footer />
  </Box>
);

export default Layout;
