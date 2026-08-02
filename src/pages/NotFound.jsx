import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-16">
      <motion.div 
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
          <h1 className="text-8xl md:text-9xl font-bold text-primary-900 relative z-10 tracking-tighter">404</h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Page Not Found</h2>
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
