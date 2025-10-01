// src/pages/about.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import pas from "../assets/Bishop.png";
import past from "../assets/p.Rose.png";
import pasto from "../assets/p.James.jpg";
import pastor from "../assets/p.Dede.jpg";
import oriang from "../assets/pastors/oriang_pastor.jpeg";
import kanyipir from "../assets/pastors/kanyipir_pastor.jpeg";
import rawinji from "../assets/pastors/rawinji_pastor.jpeg";

const AboutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('mission');


  const founders = [
  {
    id: 1,
    name: "Rev. John Doe",
    role: "Co-Founder",
    img: "../assets/p.James.jpg",
    bio: "Rev. John laid the spiritual foundation of GTM Ministries with a strong commitment to prayer and outreach."
  },
  {
    id: 2,
    name: "Mrs. Jane Doe",
    role: "Co-Founder",
    img: "../assets/p.Dede.jpg",
    bio: "Jane was instrumental in building community programs and supporting the growth of the ministry."
  },
];

  // Clergy data
  const clergyMembers = [
    {
      id: 1,
      name: "Gibson Onunga",
      title: "Bishop",
      bio: "With over 20 years of pastoral experience, Bishop Gibson brings wisdom and compassion to our congregation. He holds a Doctorate in Theology from Nairobi University.",
      img: pas,
    },
    {
      id: 2,
      name: "Teresa Owiti",
      title: "Assistant Bishop",
      bio: "Assistant Bishop Teresa leads our youth and community outreach programs. He's passionate about empowering young people to live out their faith in practical ways.",
      img: past,
    }
    /*{
      id: 3,
      name: "Justus Omundo",
      title: "Pastor",
      bio: "Pastor David has been leading worship for 15 years. He believes worship is the heartbeat of the church and creates spaces for authentic encounters with God.",
      img: pasto
    },
    {
      id: 4,
      name: "Fred Dede",
      title: "Pastor",
      bio: "Pastor Grace brings creativity and energy to our children's programs. She holds a degree in Early Childhood Education and has a gift for making biblical truths accessible.",
      img: pastor
    }*/
  ];
  
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

  // Check URL hash on component mount and navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['mission', 'clergy', 'founders'].includes(hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection('mission');
      navigate('#mission', { replace: true });
    }
  }, [location, navigate]);

  const handleSelect = (section) => {
    setActiveSection(section);
    navigate(`#${section}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {/* Mission & Vision Section */}
          {activeSection === 'mission' && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">About Us</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Grace and Truth Ministries Church is a Pentecostal church that practices a Pentecostal style of worship.
                  Our Sabbath services are a blend of traditional and contemporary worship songs and provide opportunity
                  for prayer, praise, preaching of the Word and an altar time.
                </p>
              </div>
              
              {/* Mission Section */}
              <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl border-8 border-white transform rotate-1">
                    <img 
                      src="https://t3.ftcdn.net/jpg/03/30/32/28/240_F_330322889_loyXDVKHBntIFBXuLT6LvqDxmHU9BzZn.jpg" 
                      alt="Church Mission" 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div >
                    <div className="bg-white p-6 rounded-xl">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-indigo-700">Our Mission</h3>
                      </div>
                      <p className="text-lg text-gray-700 mb-4">
                        Our mission is to be a Christ-centered community where God's love flows into our neighborhoods and beyond. We are committed to worship, discipleship, service, and sharing the Good News with the world.
                      </p>
                      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p className="text-indigo-600 italic">
                          "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you." - Matthew 28:19-20
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Vision Section */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-16">
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl border-8 border-white transform -rotate-1">
                    <img 
                      src="https://wvusstatic.com/www/uploads/2019/02/D200-0972-32-850x567.jpg" 
                      alt="Church Vision" 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <div className="bg-white p-6 rounded-xl">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-indigo-700">Our Vision</h3>
                      </div>
                      <p className="text-lg text-gray-700 mb-4">
                          We envision to Worship God in Spirit and in Truth, Empower Disciples, Encourage Believers and Embrace the Community.
                      </p>
                      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p className="text-indigo-600">
                          We envision a church that restores all of God's creation to full harmony with His perfect will and righteousness, bringing hope and healing to our community and beyond.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )} 

          {/* Clergy Section */}
          {activeSection === 'clergy' && (
            <motion.div
              key="clergy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">Spiritual Leadership</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Meet our dedicated clergy who guide and shepherd our congregation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {clergyMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
                  >
                    <div className="relative h-72">
                      <img 
                        src={member.img} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-indigo-200">{member.title}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Founders Section */} 
          {activeSection === 'founders' && (
            <motion.div
              key="founders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">Our Founders</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Learn about the visionaries who established GTM Ministries and laid the foundation for our mission
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {founders.map((founder, index) => (
                  <motion.div
                    key={founder.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
                  >
                    <div className="relative h-72">
                      <img 
                        src={founder.img} 
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                        <p className="text-indigo-200">{founder.role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {founder.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
                 
              <motion.div 
                className="mt-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Our Journey</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-indigo-600 mb-2">2003</div>
                      <p className="text-gray-700">Duly registered by the Registrar of Societies and Issued with certfificate No.22609 dated 16th July 2003</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-indigo-600 mb-2">2008</div>
                      <p className="text-gray-700">Built our first sanctuary serving 100+ members</p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-indigo-600 mb-2">Today</div>
                      <p className="text-gray-700">Serving over 500+ members across different branches countrywide</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>
            </motion.div>
          )}


          {/* Branches Section */}
          {activeSection === 'branches' && (
            <motion.div
              key="branches"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">Our Locations</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Find a church location near you and join our community
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
                        <p className="text-gray-600">{branch.pastor}</p>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutPage;