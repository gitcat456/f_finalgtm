import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../admin/services/analyticsService';

// Client-side device & OS parsing helpers (Zero PII collected)
const getDeviceType = () => {
  const ua = navigator.userAgent || '';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
};

const getBrowser = () => {
  const ua = navigator.userAgent || '';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
  if (ua.includes('Chrome') && !ua.includes('Edg/')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  return 'Other';
};

const getOS = () => {
  const ua = navigator.userAgent || '';
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac') && !ua.includes('iPhone') && !ua.includes('iPad')) return 'macOS';
  if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) return 'iOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('Linux')) return 'Linux';
  return 'Other';
};

// Generate anonymous random visitor ID if not present
const getOrCreateVisitorId = () => {
  try {
    let vid = localStorage.getItem('gtm_anon_vid');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem('gtm_anon_vid', vid);
    }
    return vid;
  } catch {
    return 'v_temp_' + Math.random().toString(36).substring(2, 10);
  }
};

const checkIsReturning = () => {
  try {
    const isNewSession = !sessionStorage.getItem('gtm_sess_active');
    let sessionCount = parseInt(localStorage.getItem('gtm_sess_count') || '0', 10);

    if (isNewSession) {
      sessionStorage.setItem('gtm_sess_active', '1');
      sessionCount += 1;
      localStorage.setItem('gtm_sess_count', sessionCount.toString());
    }

    return sessionCount > 1;
  } catch {
    return false;
  }
};

export default function AnalyticsTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef('');

  useEffect(() => {
    const currentPath = location.pathname;

    // Do not track admin panel pages as public website visits
    if (currentPath.startsWith('/admin')) {
      return;
    }

    // Avoid duplicate triggers on same page
    if (lastTrackedPath.current === currentPath) {
      return;
    }

    lastTrackedPath.current = currentPath;

    const visitorId = getOrCreateVisitorId();
    const isReturning = checkIsReturning();
    const deviceType = getDeviceType();
    const browser = getBrowser();
    const os = getOS();
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct';

    analyticsService.trackVisit({
      visitorId,
      isReturning,
      page: currentPath,
      referrer,
      deviceType,
      browser,
      os,
    });
  }, [location]);

  return null;
}
