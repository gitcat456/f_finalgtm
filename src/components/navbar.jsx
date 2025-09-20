import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Container, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Locations', to: '/locations' },
  { label: 'Social Links', to: '/socials' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  return (
    <>
      {/* Top Banner with Gradient */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to right, #1e3a8a, #6d28d9)',
          opacity: 0.95,
          color: 'white',
          py: 1,
          zIndex: (theme) => theme.zIndex.appBar - 1, // Behind navbar
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="subtitle2" align="center">
            Grace and Truth Ministries
          </Typography>
        </Container>
      </Box>

      {/* Main Navbar - Sticky */}
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={1}
        sx={{ 
          top: 0, // Stick to top
          zIndex: (theme) => theme.zIndex.appBar,
          mt: '40px', // Space for top banner
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
            {/* Logo */}
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  margin: 0,
                }}
              >
                <img
                  src="/off_logo.png"
                  alt="GTM Logo"
                  style={{
                    width: 46,
                    height: 'auto',
                    marginRight: 8,
                    backgroundColor: 'transparent',
                    display: 'block',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                />
                <Typography variant="h6" fontWeight={700}>
                  GTM Ministries
                </Typography>
              </Box>
            </NavLink>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? '#1976d2' : 'inherit',
                    fontWeight: isActive ? 600 : 400,
                    padding: '8px 12px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    },
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </Box>

            
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ display: { md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box
          sx={{
            width: 260,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7f1 100%)',
          }}
        >
          
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              GTM Ministries
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation Links */}
          <List>
            {navLinks.map(({ label, to }) => (
              <ListItemButton
                key={to}
                component={NavLink}
                to={to}
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  },
                  '&.active': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                  },
                }}
              >
                <ListItemText 
                  primary={label} 
                  primaryTypographyProps={{ fontWeight: 500 }} 
                />
              </ListItemButton>
            ))}
          </List>

          {/* Spacer to push verse to bottom */}
          <Box sx={{ flexGrow: 1 }} />

          
          <Box sx={{ p: 2, bgcolor: '#f0f4f8', borderRadius: 1, mt: 2 }}>
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                color: 'primary.dark',
                lineHeight: 1.6,
              }}
            >
              "And the Word became flesh and dwelt among us, and we beheld His glory,
              the glory as of the only begotten of the Father, full of grace and truth."
              <br />
              <Box component="span" sx={{ fontWeight: 600, display: 'block', mt: 1 }}>
                John 1:14 (NKJV)
              </Box>
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;