import React from 'react';
import { motion } from 'framer-motion';
import { Call as PhoneIcon } from '@mui/icons-material';
import { branches } from '../data/branchesData';
import { getPastorImage } from '../data/pastorData';
import childrenBg from '../assets/children.jpg';

const BranchesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden rounded-b-3xl mb-12 shadow-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 opacity-95"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
            style={{ backgroundImage: `url(${childrenBg})` }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Our Church Branches
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto font-light leading-relaxed">
                Find a Grace and Truth Ministries location near you and join our community
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Branches Content */}
      <div className="content-container pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 tracking-tight">Our Locations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We have multiple branches across the country. Find one near you and join our worship community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.05 }}
                className="card overflow-hidden flex flex-col h-full group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={branch.img} 
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{branch.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Location">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700 font-medium">{branch.location}</p>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Service Times">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 text-sm">{branch.services}</p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-5 mt-auto">
                    <h4 className="font-bold text-gray-900 mb-4 tracking-wide uppercase text-xs text-primary-600">Leadership</h4>
                    <div className="space-y-4">
                      {branch.pastors && branch.pastors.length > 0 ? (
                        branch.pastors.map((p, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 shadow-sm border border-gray-200 flex-shrink-0">
                              <img 
                                src={getPastorImage(p.name)} 
                                alt={p.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <p className="text-gray-900 font-semibold text-sm">{p.name}</p>
                              <div className="flex items-center mt-0.5">
                                <PhoneIcon sx={{ color: '#6b7280', fontSize: '14px', mr: 0.5 }} />
                                <a href={`tel:${p.contact}`} className="text-gray-600 text-sm hover:text-primary-600 transition-colors">
                                  {p.contact}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">Leadership information not available</p>
                      )}
                    </div>
                  </div>
                  
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full btn-outline"
                  >
                    View on Map
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 text-center border border-primary-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
            
            <h3 className="text-2xl font-bold text-primary-900 mb-4 tracking-tight relative z-10">Can't Find a Branch Near You?</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-2 relative z-10 leading-relaxed">
              We're constantly expanding our community. If you don't see a branch in your area, let us know and we'll help you connect with fellow believers nearby.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BranchesPage;