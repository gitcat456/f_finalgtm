import { useState, useEffect, useCallback } from 'react';
import { getLiveStreamConfig, updateLiveStreamConfig, subscribeToLiveStreamConfig } from '../services/liveStreamService';

/**
 * Custom React Hook for live stream state management
 */
export const useLiveStream = () => {
  const [config, setConfig] = useState(getLiveStreamConfig);

  useEffect(() => {
    // Initial fetch
    setConfig(getLiveStreamConfig());

    // Subscribe to changes (cross-tab & same-tab)
    const unsubscribe = subscribeToLiveStreamConfig((updatedConfig) => {
      setConfig(updatedConfig);
    });

    return unsubscribe;
  }, []);

  const updateConfig = useCallback((newConfig) => {
    const updated = updateLiveStreamConfig(newConfig);
    setConfig(updated);
    return updated;
  }, []);

  return {
    ...config,
    updateConfig,
  };
};

export default useLiveStream;
