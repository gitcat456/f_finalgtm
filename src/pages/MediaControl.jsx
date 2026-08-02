import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  YouTube as YouTubeIcon,
  Facebook as FacebookIcon,
  Sensors as SensorsIcon,
  Videocam as VideocamIcon,
  CheckCircle as CheckCircleIcon,
  Link as LinkIcon,
  Title as TitleIcon,
  Visibility as VisibilityIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import useLiveStream from '../hooks/useLiveStream';
import WeAreLiveBanner from '../components/WeAreLiveBanner';

const PRESET_YOUTUBE = 'https://www.youtube.com/@graceandtruthministriesglobal/live';
const PRESET_FACEBOOK = 'https://www.facebook.com/profile.php?id=100064719998736';

const MediaControl = () => {
  const { isLive, platform, streamUrl, title, updateConfig } = useLiveStream();

  // Local form state
  const [formLive, setFormLive] = useState(isLive);
  const [formPlatform, setFormPlatform] = useState(platform);
  const [formUrl, setFormUrl] = useState(streamUrl);
  const [formTitle, setFormTitle] = useState(title);

  // UI notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Sync state if external change happens
  useEffect(() => {
    setFormLive(isLive);
    setFormPlatform(platform);
    setFormUrl(streamUrl);
    setFormTitle(title);
  }, [isLive, platform, streamUrl, title]);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    try {
      updateConfig({
        isLive: formLive,
        platform: formPlatform,
        streamUrl: formUrl,
        title: formTitle,
      });
      setSnackbar({
        open: true,
        message: formLive ? 'Live stream is now LIVE on the homepage!' : 'Live stream status turned OFF.',
        severity: formLive ? 'success' : 'info',
      });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update live stream settings.', severity: 'error' });
    }
  };

  const handleToggleLive = (event) => {
    const nextLive = event.target.checked;
    setFormLive(nextLive);
    updateConfig({
      isLive: nextLive,
      platform: formPlatform,
      streamUrl: formUrl,
      title: formTitle,
    });
    setSnackbar({
      open: true,
      message: nextLive ? 'Broadcast is now LIVE on the homepage!' : 'Broadcast turned OFF.',
      severity: nextLive ? 'success' : 'info',
    });
  };

  const applyPreset = (presetPlatform, presetUrl) => {
    setFormPlatform(presetPlatform);
    setFormUrl(presetUrl);
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'grey.50', minHeight: '85vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              bgcolor: 'indigo.50',
              background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
              color: 'white',
              display: 'flex',
            }}
          >
            <VideocamIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: 'grey.900' }}>
              Media Team Live Control
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage real-time live stream broadcasts and homepage status
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Controls Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SettingsIcon color="primary" /> Stream Configuration
                </Typography>
                <Chip
                  icon={<SensorsIcon />}
                  label={formLive ? 'BROADCASTING LIVE' : 'STATUS: OFFLINE'}
                  color={formLive ? 'error' : 'default'}
                  sx={{ fontWeight: 700 }}
                />
              </Box>

              <Divider sx={{ mb: 4 }} />

              <form onSubmit={handleSave}>
                {/* Live Status Switch */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: formLive ? 'error.50' : 'grey.100',
                    border: '1px solid',
                    borderColor: formLive ? 'error.200' : 'grey.300',
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color={formLive ? 'error.900' : 'grey.800'}>
                      Live Broadcast Switch
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toggle to display the "We Are Live" banner on the church homepage.
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formLive}
                        onChange={handleToggleLive}
                        color="error"
                        sx={{ transform: 'scale(1.3)' }}
                      />
                    }
                    label=""
                  />
                </Box>

                {/* Platform Selection */}
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                  1. Select Streaming Platform
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 6 }}>
                    <Card
                      onClick={() => setFormPlatform('YouTube')}
                      sx={{
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: formPlatform === 'YouTube' ? '#FF0000' : 'grey.200',
                        bgcolor: formPlatform === 'YouTube' ? 'red.50' : 'background.paper',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#FF0000' },
                      }}
                    >
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
                        <YouTubeIcon sx={{ color: '#FF0000', fontSize: 32 }} />
                        <Box>
                          <Typography fontWeight={700}>YouTube</Typography>
                          <Typography variant="caption" color="text.secondary">YouTube Live</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <Card
                      onClick={() => setFormPlatform('Facebook')}
                      sx={{
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: formPlatform === 'Facebook' ? '#1877F2' : 'grey.200',
                        bgcolor: formPlatform === 'Facebook' ? 'blue.50' : 'background.paper',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#1877F2' },
                      }}
                    >
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
                        <FacebookIcon sx={{ color: '#1877F2', fontSize: 32 }} />
                        <Box>
                          <Typography fontWeight={700}>Facebook</Typography>
                          <Typography variant="caption" color="text.secondary">Facebook Live</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Stream URL Input */}
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                  2. Live Stream URL
                </Typography>
                <TextField
                  fullWidth
                  placeholder="https://youtube.com/live/..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  sx={{ mb: 1 }}
                  slotProps={{
                    input: {
                      startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    },
                  }}
                />
                
                {/* Quick Preset buttons */}
                <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<YouTubeIcon sx={{ color: 'red' }} />}
                    onClick={() => applyPreset('YouTube', PRESET_YOUTUBE)}
                  >
                    Official YouTube Live Link
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
                    onClick={() => applyPreset('Facebook', PRESET_FACEBOOK)}
                  >
                    Official Facebook Page Link
                  </Button>
                </Box>

                {/* Stream Service Title */}
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                  3. Service / Stream Title (Optional)
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Saturday Sabbath Worship Service"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  sx={{ mb: 4 }}
                  slotProps={{
                    input: {
                      startAdornment: <TitleIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    },
                  }}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                  }}
                >
                  Save Live Stream Settings
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Live Preview Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 4, sticky: 'top', top: 100 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon color="secondary" /> Real-time Live Preview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This is how the "We Are Live" component will appear on the homepage:
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {formLive ? (
                <Box sx={{ zoom: 0.9 }}>
                  <WeAreLiveBanner />
                </Box>
              ) : (
                <Alert severity="info" sx={{ borderRadius: 3 }}>
                  Live status is currently <strong>OFF</strong>. The live banner will remain hidden from visitors on the homepage until turned ON.
                </Alert>
              )}

              <Box sx={{ mt: 4, p: 2.5, bgcolor: 'grey.100', borderRadius: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                  💡 Media Team Tips:
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  • Make sure to test the Live Stream URL before enabling the live status.
                  <br />
                  • Turn the switch OFF after the service concludes.
                  <br />
                  • Settings are saved instantly and update across all active user sessions.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%', fontWeight: 600 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default MediaControl;
