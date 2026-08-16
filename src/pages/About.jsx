// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import pas from "../assets/Bishop.webp";
import past from "../assets/p.Rose.png";
import vission from "../assets/vission.jpg";

// Fallback initial data in case database is empty
const initialFounders = [
  // {
  //   id: 1,
  //   name: "The Late Bishop Nathaniel Owiti",
  //   role: "Founder",
  //   img: pas,
  //   bio: "Bishop Nathaniel laid the spiritual foundation of GTM Ministries with a strong commitment to prayer and outreach."
  // }
];

const initialClergy = [
  {
    id: 1,
    name: "Gibson Onunga",
    title: "Bishop",
    bio: "With over 2g0 years of pastoral experience, Bishop Gibson brings wisdom and compassion to our congregation.",
    img: pas,
  },
  {
    id: 2,
    name: "Teresa Owiti",
    title: "Assistant Bishop",
    bio: "Assistant Bishop Teresa leads our youth and community outreach programs. She's passionate about empowering young people to live out their faith in practical ways.",
    img: past,
  }
];

const tabs = [
  { id: 'mission', label: 'Mission & Vision' },
  { id: 'clergy', label: 'Our Clergy' },
  { id: 'founders', label: 'Founders' }
];

const AboutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('mission');

  const [founders, setFounders] = useState(initialFounders);
  const [clergyMembers, setClergyMembers] = useState(initialClergy);

  // Fetch Founders and Clergy members from backend API
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL || 'https://ffinalgtm-production.up.railway.app/api';

    const fetchAboutData = async () => {
      try {
        const [foundersRes, clergyRes] = await Promise.allSettled([
          fetch(`${API_BASE}/founders`),
          fetch(`${API_BASE}/clergy`),
        ]);

        if (foundersRes.status === 'fulfilled' && foundersRes.value.ok) {
          const foundersData = await foundersRes.value.json();
          if (foundersData.data?.founders && foundersData.data.founders.length > 0) {
            setFounders(foundersData.data.founders);
          }
        }

        if (clergyRes.status === 'fulfilled' && clergyRes.value.ok) {
          const clergyData = await clergyRes.value.json();
          if (clergyData.data?.clergy && clergyData.data.clergy.length > 0) {
            setClergyMembers(clergyData.data.clergy);
          }
        }
      } catch (error) {
        console.error('Error fetching About data:', error);
      }
    };

    fetchAboutData();
  }, []);

  // Check URL hash on component mount and navigation to set active tab
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['mission', 'clergy', 'founders'].includes(hash)) {
      setActiveSection(hash);
    }
  }, [location]);

  const handleSelect = (section) => {
    setActiveSection(section);
    navigate(`#${section}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8">
      <div className="container mx-auto px-4 pb-16">

        {/* Header and Tabs */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Grace and Truth Ministries Church is a Pentecostal church that practices a Pentecostal style of worship.
            Our Sabbath services are a blend of traditional and contemporary worship songs and provide opportunity
            for prayer, praise, preaching of the Word and an altar time.
          </motion.p>

          {/* Pill Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-sm ${activeSection === tab.id
                  ? 'bg-primary-600 text-white shadow-md transform -translate-y-0.5'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200'
                  }`}
                aria-current={activeSection === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content area with transitions */}
        <AnimatePresence mode="wait">

          {/* ─── Mission & Vision Section ────────────────────────────────────────── */}
          {activeSection === 'mission' && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              {/* Mission Section */}
              <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                <div className="md:w-1/2">
                  <div className="image-container shadow-xl border-8 border-white transform rotate-1">
                    <img
                      src="https://t3.ftcdn.net/jpg/03/30/32/28/240_F_330322889_loyXDVKHBntIFBXuLT6LvqDxmHU9BzZn.jpg"
                      alt="Church Mission"
                      className="w-full h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-primary-800">Our Mission</h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Our mission is to be a Christ-centered community where God's love flows into our neighborhoods and beyond. We are committed to worship, discipleship, service, and sharing the Good News with the world.
                    </p>
                    <blockquote className="bg-primary-50 p-5 rounded-xl border-l-4 border-primary-500">
                      <p className="text-primary-700 italic font-medium leading-relaxed">
                        "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you." - Matthew 28:19-20
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Vision Section */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-16">
                <div className="md:w-1/2">
                  <div className="image-container shadow-xl border-8 border-white transform -rotate-1">
                    <img
                      src={vission}
                      alt="Church Vision"
                      className="w-full h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-secondary-800">Our Vision</h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      We envision to Worship God in Spirit and in Truth, Empower Disciples, Encourage Believers and Embrace the Community.
                    </p>
                    <blockquote className="bg-secondary-50 p-5 rounded-xl border-l-4 border-secondary-500">
                      <p className="text-secondary-700 font-medium leading-relaxed">
                        We envision a church that restores all of God's creation to full harmony with His perfect will and righteousness, bringing hope and healing to our community and beyond.
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── Clergy Section ────────────────────────────────────────────────── */}
          {activeSection === 'clergy' && (
            <motion.div
              key="clergy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {clergyMembers.map((member, index) => (
                  <motion.div
                    key={member._id || member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.1 }}
                    className="card overflow-hidden group"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={member.image || member.img || pas}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-primary-300 font-medium">{member.title || member.role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.bio || member.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Founders Section ──────────────────────────────────────────────── */}
          {activeSection === 'founders' && (
            <motion.div
              key="founders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              {/* Founders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {founders.map((founder, index) => (
                  <motion.div
                    key={founder._id || founder.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.1 }}
                    className="card overflow-hidden group"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={founder.image || founder.img || pas}
                        alt={founder.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="text-xl font-bold text-white leading-tight mb-1">{founder.name}</h3>
                        <p className="text-secondary-300 font-medium">{founder.role || founder.title || "Founder"}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {founder.bio || founder.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Our Journey Timeline */}
              <motion.div
                className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 sm:p-12 shadow-sm border border-primary-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-10 text-center tracking-tight">Our Journey</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 relative">

                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-0.5 bg-primary-200"></div>

                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm font-bold">1</div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary-800 mb-3">2003</div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-[250px] mx-auto">
                        Duly registered by the Registrar of Societies and Issued with certificate No.22609 dated 16th July 2003
                      </p>
                    </div>

                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm font-bold">2</div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary-800 mb-3">2008</div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-[250px] mx-auto">
                        Built our first sanctuary serving 100+ members
                      </p>
                    </div>

                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm font-bold">3</div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary-800 mb-3">Today</div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-[250px] mx-auto">
                        Serving over 500+ members across different branches countrywide
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutPage;