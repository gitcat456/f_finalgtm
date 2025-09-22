// src/pages/Branches.jsx
import React from 'react';
import { motion } from 'framer-motion';
import oriang from "../assets/pastors/oriang_pastor.jpeg";
import kanyipir from "../assets/pastors/kanyipir_pastor.jpeg";
import rawinji from "../assets/pastors/rawinji_pastor.jpeg";
import pas from "../assets/Bishop.jpg";
import past from "../assets/p.Rose.jpg";
import pasto from "../assets/p.James.jpg";
import pastor from "../assets/p.Dede.jpg";

const BranchesPage = () => {
  // Pastor images mapping
  const pastorImages = {
    "Pastor Dancun Ongoro": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "Pastor Rosemary": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "Pastor Lilian": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "Pastor Fred Dede": pastor,
    "Pastor Oromo Samson": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "Pastor James Ochieng": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80",
    "Pastor John Ouru": oriang,
    "Gibson Onunga": pas,
    "Teresa Owiti": past,
    "Justus Omundo": pasto
  };

  // Default pastor image if not found
  const getPastorImage = (pastorName) => {
    return pastorImages[pastorName] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80";
  };

  // Branches data
  const branches = [
    {
      id: 1,
      name: "Mathare Church",
      location: "Mathare 4A, Nairobi",
      pastor: "Pastor Dancun Ongoro",
      services: "Saturday: 9am to 1pm",
      img: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Kiambio Branch",
      location: "Kiambio, Nairobi",
      pastor: "Pastor Rosemary",
      services: "Saturday: 9am to 1pm",
      img: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "LuckySummer Branch",
      location: "LuckSummer, Nairobi",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Rongai Branch",
      location: "Rongai, Nairobi",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Obama Branch",
      location: "Obama Estate",
      pastor: "Pastor Fred Dede",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Ruaraka Branch",
      location: "Mathare North Area2, Nairobi",
      pastor: "Pastor Oromo Samson",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "Kisumu Branch",
      location: "Nyamasaria, Kisumu",
      pastor: "Pastor James Ochieng",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      name: "Oriang Church",
      location: "Oriang, Kendubay",
      pastor: "Pastor John Ouru",
      services: "Saturday 9am to 1pm ",
      img: oriang
    },
    {
      id: 9,
      name: "Dago Branch",
      location: "Homabay",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 10,
      name: "Kanyipir",
      location: "Kanyipir, Homabay",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: kanyipir
    },
    {
      id: 11,
      name: "Got0yolo",
      location: "LuckySummer, Nairobi",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 12,
      name: "Rawinji Branch ",
      location: "Oyugis, KenduBay",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: rawinji
    },
    {
      id: 13,
      name: "Got Kamajiwa",
      location: "Homabay",
      pastor: "Pastor Lilian",
      services: "Saturday 9am to 1pm ",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-95"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517021897933-0c031b497f3e?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">Our Locations</h2>
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
                    <h4 className="font-bold text-gray-800 mb-3">Pastor</h4>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-indigo-500 flex-shrink-0">
                        <img 
                          src={getPastorImage(branch.pastor)} 
                          alt={branch.pastor}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-600">{branch.pastor}</p>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
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
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Request a New Branch
            </button>
          </div>

          {/* Map Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Find Us on the Map</h3>
            <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11111.314 0z" />
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