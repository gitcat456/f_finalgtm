// src/components/Navbar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Container, Divider, Menu, MenuItem, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useNavigate } from 'react-router-dom';
import off_logo from '../assets/off_logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutMenuAnchor, setAboutMenuAnchor] = useState(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const handleAboutMenuOpen = (event) => {
    setAboutMenuAnchor(event.currentTarget);
  };

  const handleAboutMenuClose = () => {
    setAboutMenuAnchor(null);
  };

  const handleMobileAboutToggle = () => {
    setMobileAboutOpen(!mobileAboutOpen);
  };

  const handleAboutOptionClick = (section) => {
    navigate(`/about#${section}`);
    setAboutMenuAnchor(null);
    setMobileOpen(false);
    setMobileAboutOpen(false);
  };

  const navLinks = [
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
          zIndex: (theme) => theme.zIndex.appBar - 1,
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
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          mt: '40px',
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
                  src={off_logo}
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
                <Typography variant="h6" fontWeight={700} className="text-indigo-800">
                  GTM Ministries
                </Typography>

              </Box>
            </NavLink>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {navLinks.map((item) => (
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
                        alignItems: 'center'
                      }}
                    >
                      {item.label}
                      <svg 
                        className="ml-1 h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    <Menu
                      anchorEl={aboutMenuAnchor}
                      open={Boolean(aboutMenuAnchor)}
                      onClose={handleAboutMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'about-menu-button',
                      }}
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          mt: 1.5,
                          minWidth: 240,
                          borderRadius: 2,
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
                          <Box>
                            <Typography variant="body1" fontWeight={500}>
                              {option.label}
                            </Typography>
                          </Box>
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
            {navLinks.map((item) => (
              item.hasSubmenu ? (
                <Box key={item.to}>
                  <ListItemButton
                    onClick={handleMobileAboutToggle}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                    }}
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

export default Navbar;