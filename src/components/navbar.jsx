// src/components/navbar.jsx
import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Container, Divider, Menu, MenuItem, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarLiveBadge from './NavbarLiveBadge';
import { getOptimizedImageUrl } from '../utils/cloudinary';

// Static nav links outside component
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    hasSubmenu: true,
    options: [
      { label: 'Our Mission & Vision', section: 'mission' },
      { label: 'Our Clergy', section: 'clergy' },
      { label: 'Founders', section: 'founders' },
    ]
  },
  { label: 'Events', to: '/events' },
  { label: 'Locations', to: '/locations' },
  { label: 'Social Links', to: '/gtm_socials' },
];

// Logo — width 300 (logo)
const off_logo = getOptimizedImageUrl(
  "https://res.cloudinary.com/dyy3aepmu/image/upload/v1785606828/off_logo_dz4tio.png",
  300
);

// Logo component with optimization
const Logo = React.memo(() => (
  <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Circular glowing logo container */}
      <Box
        sx={{
          width: 55,
          height: 55,
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '10px',
          flexShrink: 0,
          border: '2px solid #4f46e5',

        }}
      >
        <img
          src={off_logo}
          alt="Grace and Truth Ministries (GTM Church) Logo"
          loading="eager"
          width={48}
          height={48}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            backgroundColor: 'transparent',
          }}
        />
      </Box>
      {/* Two-tone brand text */}
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: '1.15rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2,
          }}
        >
          GTM
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'Georgia', serif",
            fontWeight: 400,
            fontSize: '0.7rem',
            color: '#6b21a8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}
        >
          Ministries
        </Typography>
      </Box>
    </Box>
  </NavLink>
));

Logo.displayName = 'Logo';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutMenuAnchor, setAboutMenuAnchor] = useState(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const navigate = useNavigate();

  // Memoize callbacks to prevent unnecessary re-renders
  const toggleDrawer = useCallback((open) => () => {
    setMobileOpen(open);
  }, []);

  const handleAboutMenuOpen = useCallback((event) => {
    setAboutMenuAnchor(event.currentTarget);
  }, []);

  const handleAboutMenuClose = useCallback(() => {
    setAboutMenuAnchor(null);
  }, []);

  const handleMobileAboutToggle = useCallback(() => {
    setMobileAboutOpen(prev => !prev);
  }, []);

  const handleAboutOptionClick = useCallback((section) => {
    navigate(`/about#${section}`);
    setAboutMenuAnchor(null);
    setMobileOpen(false);
    setMobileAboutOpen(false);
  }, [navigate]);

  return (
    <>
      {/* Top Banner with Gradient - Now part of normal flow */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(to right, #111827, #1e1b4b, #3b0764)',
          color: 'white',
          py: 1,
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Typography variant="subtitle2" align="center" sx={{ fontSize: '0.875rem' }}>
            Grace and Truth Ministries
          </Typography>
          {/* Desktop/Wide screens: Displayed on the 1st (top) navbar */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: 16 }}>
            <NavbarLiveBadge />
          </Box>
        </Container>
      </Box>

      {/* Main Navbar - Sticky */}
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
            {/* Logo + Mobile Live Badge (Displayed on 2nd navbar on mobile screens) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
              <Logo />
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <NavbarLiveBadge />
              </Box>
            </Box>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {NAV_LINKS.map((item) => (
                item.hasSubmenu ? (
                  <Box key={item.to}>
                    <div
                      onClick={handleAboutMenuOpen}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 400,
                        padding: '8px 12px',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        userSelect: 'none',
                      }}
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={Boolean(aboutMenuAnchor)}
                    >
                      {item.label}
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    <Menu
                      anchorEl={aboutMenuAnchor}
                      open={Boolean(aboutMenuAnchor)}
                      onClose={handleAboutMenuClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          mt: 1.5,
                          minWidth: 240,
                          borderRadius: 2,
                          overflow: 'visible',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                          '& .MuiMenuItem-root': {
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                            },
                          },
                          '& .MuiTypography-root': {
                            color: 'rgba(255, 255, 255, 0.9)',
                          },
                        }
                      }}
                    >
                      {item.options.map((option) => (
                        <MenuItem
                          key={option.section}
                          onClick={() => handleAboutOptionClick(option.section)}
                          sx={{
                            py: 1.5,
                            px: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            },
                          }}
                        >
                          <Typography variant="body1" fontWeight={500}>
                            {option.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? '#3730a3' : 'inherit',
                      fontWeight: isActive ? 600 : 400,
                      padding: '8px 12px',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                    })}
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                  >
                    {item.label}
                  </NavLink>
                )
              ))}
            </Box>

            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ display: { md: 'none' }, color: 'text.primary' }}
              aria-label="open navigation menu"
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
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              GTM Ministries
            </Typography>
            <IconButton onClick={toggleDrawer(false)} aria-label="close navigation menu">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation Links */}
          <List>
            {NAV_LINKS.map((item) => (
              item.hasSubmenu ? (
                <Box key={item.to}>
                  <ListItemButton
                    onClick={handleMobileAboutToggle}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                    aria-expanded={mobileAboutOpen}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    {mobileAboutOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={mobileAboutOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.options.map((option) => (
                        <ListItemButton
                          key={option.section}
                          sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
                          onClick={() => handleAboutOptionClick(option.section)}
                        >
                          <ListItemText
                            primary={option.label}
                            primaryTypographyProps={{ fontWeight: 400 }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                <ListItemButton
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.active': {
                      backgroundColor: '#3730a3',
                      color: 'white',
                      fontWeight: 600,
                    },
                  }}
                  aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              )
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
                color: '#3730a3',
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

export default React.memo(Navbar);
