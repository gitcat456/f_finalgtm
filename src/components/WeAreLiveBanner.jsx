import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YouTube as YouTubeIcon, Facebook as FacebookIcon, OpenInNew as OpenInNewIcon, Sensors as SensorsIcon } from '@mui/icons-material';
import useLiveStream from '../hooks/useLiveStream';

/**
 * WeAreLiveBanner
 * 
 * Modern animated "We Are Live" banner displayed on the Homepage when live status is active.
 */
const WeAreLiveBanner = () => {
  const { isLive, platform, streamUrl, title } = useLiveStream();

  if (!isLive) return null;

  const isYouTube = platform?.toLowerCase() === 'youtube';
  const platformColor = isYouTube ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl mx-auto my-6 px-4"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-950 p-6 md:p-8 text-white shadow-2xl border border-red-500/30">
          {/* Animated red ambient glow background */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-600 opacity-20 blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-600 opacity-20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Left side: Live Badge & Stream Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">

              {/* Animated Live Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/90 border border-red-400/50 shadow-lg shadow-red-600/30 shrink-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="text-xs font-extrabold tracking-wider uppercase text-white">LIVE NOW</span>
              </div>

              {/* Text Info */}
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <SensorsIcon className="text-red-400 animate-pulse text-xl" />
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    GTM Church is Broadcasting Live!
                  </h3>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light max-w-xl">
                  {title || 'Join our online service live and worship with us from anywhere.'}
                </p>

                {/* Platform tag */}
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
                  {isYouTube ? (
                    <YouTubeIcon sx={{ fontSize: 18 }} className="text-red-500" />
                  ) : (
                    <FacebookIcon sx={{ fontSize: 18 }} className="text-blue-500" />
                  )}
                  <span>Streaming on <strong>{platform}</strong></span>
                </div>
              </div>
            </div>

            {/* Right side: Watch Live Action Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={streamUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white shadow-xl ${platformColor} transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 text-base`}
              >
                {isYouTube ? <YouTubeIcon /> : <FacebookIcon />}
                <span>Watch Live on {platform}</span>
                <OpenInNewIcon sx={{ fontSize: 18 }} />
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WeAreLiveBanner;
