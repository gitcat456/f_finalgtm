import React from 'react';
import { motion } from 'framer-motion';
import { Call as PhoneIcon } from '@mui/icons-material';
import { branches } from '../data/branchesData';
import { getPastorImage } from '../data/pastorData';

const BranchesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-95"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
            style={{ backgroundImage: "url('/src/assets/children.jpg')" }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Our Church Branches
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                Find a Grace and Truth Ministries location near you and join our community
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Branches Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-indigo-800 mb-4">Our Locations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have multiple branches across the country. Find one near you and join our worship community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="relative h-60">
                  <img 
                    src={branch.img} 
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{branch.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600">{branch.location}</p>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600">{branch.services}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-bold text-gray-800 mb-3">Pastor(s)</h4>
                    <div className="space-y-4">
                      {[branch.pastor, branch.pastor1, branch.pastor2]
                        .filter(pastor => pastor) // Remove undefined/null values
                        .map((pastor, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-indigo-500 flex-shrink-0">
                            <img 
                              src={getPastorImage(pastor)} 
                              alt={pastor}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-gray-600">{pastor}</p>
                            <div className="flex items-center mt-1">
                              <PhoneIcon sx={{ color: '#6366F1', fontSize: '18px', mr: 1 }} />
                              <span className="text-gray-600 text-sm">
                                {index === 0 ? branch.contact : (index === 1 ? branch.contact1 : branch.contact2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    onClick={() => alert('Feature coming soon!')}
                  >
                    Visit This Location
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">Can't Find a Branch Near You?</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              We're constantly expanding our community. If you don't see a branch in your area, let us know and we'll help you connect with fellow believers nearby.
            </p>
            {/*<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Request a New Branch
            </button>*/}
          </div>

          {/* Map Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Find Us on the Map</h3>
            <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600">Interactive map coming soon</p>
                <p className="text-sm text-gray-500 mt-2">We're working on an interactive map to help you find our branches more easily.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BranchesPage;