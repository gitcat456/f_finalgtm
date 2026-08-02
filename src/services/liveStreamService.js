/**
 * Live Stream Service
 * 
 * Abstraction layer for reading and updating live stream settings.
 * Currently uses localStorage for local persistence across reloads & tabs.
 * Designed to easily swap out or augment with backend API calls (e.g. fetch('/api/livestream'))
 * in the future without modifying consuming components.
 */

const STORAGE_KEY = 'gtm_live_stream_config';
const EVENT_NAME = 'gtm_live_stream_change';

const DEFAULT_CONFIG = {
  isLive: false,
  platform: 'YouTube', // 'YouTube' | 'Facebook'
  streamUrl: 'https://www.youtube.com/@graceandtruthministriesglobal/live',
  title: 'Sunday Worship & Word Service',
  startedAt: null,
};

/**
 * Get current live stream configuration.
 */
export const getLiveStreamConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Failed to parse live stream config from localStorage:', err);
  }
  return DEFAULT_CONFIG;
};

/**
 * Save updated live stream configuration.
 */
export const updateLiveStreamConfig = (newConfig) => {
  try {
    const current = getLiveStreamConfig();
    const updated = {
      ...current,
      ...newConfig,
      startedAt: newConfig.isLive && !current.isLive ? new Date().toISOString() : current.startedAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    // Dispatch event for same-tab updates
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to save live stream config to localStorage:', err);
    throw err;
  }
};

/**
 * Subscribe to live stream configuration changes (same-tab and cross-tab).
 */
export const subscribeToLiveStreamConfig = (callback) => {
  const handleCustomEvent = (event) => {
    callback(event.detail);
  };

  const handleStorageEvent = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(getLiveStreamConfig());
    }
  };

  window.addEventListener(EVENT_NAME, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(EVENT_NAME, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
};
