import { useState, useEffect, useCallback } from 'react';
import { getLiveStreamConfig, updateLiveStreamConfig, subscribeToLiveStreamConfig } from '../services/liveStreamService';


export const useLiveStream = () => {
  const [config, setConfig] = useState(getLiveStreamConfig);

  useEffect(() => {
   
    setConfig(getLiveStreamConfig());

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
