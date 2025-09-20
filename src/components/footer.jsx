import React, { useMemo } from 'react';
import { Box, Typography, Divider, Stack, IconButton } from '@mui/material';
import {
  Church as ChurchIcon,
  Facebook as FacebookIcon,
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Room as RoomIcon,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const quickLinks = ['Home', 'About Us', 'Events', 'Locations', 'Social Links'];
const serviceTimes = [
  { day: 'Saturday', time: '9:00 AM & 1:00 PM' },
  { day: 'Wednesday', time: '6:00 PM' },
  { day: 'Friday Verspers', time: '6:00 PM' }
];

const linkMap = {
  'Home': '/',
  'About Us': '/about',
  'Events': '/events',
  'Locations': '/locations',
  'Social Links': '/socials'
};

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'common.white',
        py: 6,
        px: { xs: 2, sm: 4 },
        mt: 'auto'
      }}
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 4
        }}>
          {/* Church Info */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ChurchIcon sx={{ color: 'primary.light', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                GTM Ministries
              </Typography>
            </Box>
            <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Spreading the gospel of grace and truth to all nations.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton href="#" sx={{ color: 'grey.400', '&:hover': { color: 'common.white' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: 'grey.400', '&:hover': { color: 'common.white' } }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: 'grey.400', '&:hover': { color: 'common.white' } }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Quick Links</Typography>
            <Stack spacing={1}>
              {quickLinks.map((label) => (
                <NavLink
                  key={label}
                  to={linkMap[label]}
                  style={{ textDecoration: 'none' }}
                >
                  {({ isActive }) => (
                    <Typography
                      variant="body2"
                      sx={{
                        color: isActive ? 'primary.light' : 'grey.300',
                        '&:hover': { color: 'primary.light' }
                      }}
                    >
                      {label}
                    </Typography>
                  )}
                </NavLink>
              ))}
            </Stack>
          </Box>

          {/* Contact Us */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Contact Us</Typography>
            <Stack spacing={1.5}>
              <ContactItem icon={<RoomIcon />} text="Mathare 4A, Nairobi, Kenya" />
              <ContactItem icon={<PhoneIcon />} text="+254 717508987" />
              <ContactItem icon={<EmailIcon />} text="gtministries@gmail.com" />
            </Stack>
          </Box>

          {/* Service Times */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Service Times</Typography>
            <Stack spacing={1}>
              {serviceTimes.map((service) => (
                <Box key={service.day} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="grey.300">{service.day}</Typography>
                  <Typography variant="body2" color="grey.300">{service.time}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'grey.700', my: 4 }} />

        <Typography variant="body2" color="grey.500" align="center">
          &copy; {currentYear} Grace and Truth Ministries. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

const ContactItem = React.memo(({ icon, text }) => (
  <Stack direction="row" alignItems="center">
    {React.cloneElement(icon, { sx: { color: 'primary.light', mr: 1.5 } })}
    <Typography variant="body2" color="grey.300">
      {text}
    </Typography>
  </Stack>
));

export default React.memo(Footer);
