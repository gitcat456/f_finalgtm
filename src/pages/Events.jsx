// src/pages/Events.jsx
import React, { useState } from 'react';
import campPoster from '../assets/event2.jpg';
import youthCampPoster from '../assets/event1.jpg';
import { motion } from 'framer-motion';

// Static Data Moved Outside Component
const EVENTS_DATA = [
  {
    id: 1,
    status: 'past',
    title: "Youth Conference 2025",
    subtitle: "Living in Purpose",
    scripture: "Jeremiah 29:11",
    dateRange: "15th - 17th March 2025",
    times: {
      sabbath: "8:00am - 5:00pm EAT",
      otherDays: "9:00am - 4:00pm EAT"
    },
    note: "Transportation provided from main church building",
    monthYear: "MARCH, 2025",
    tag: "YOUTH",
    vision: "Empowering young believers to discover their God-given purpose and live impactful Christian lives in the modern world.",
    mission: "Equip youth with biblical principles and practical tools to navigate life's challenges while maintaining a strong relationship with Christ.",
    image: youthCampPoster,
  },
  {
    id: 2,
    status: 'past',
    title: "Camp Meeting 2025",
    subtitle: "LET THE WIND BLOW",
    scripture: "EZEKIEL 37:9",
    dateRange: "10th - 16th August 2025",
    times: {
      sabbath: "9:00am - 1:45pm EAT",
      otherDays: "8:00am - 6:45pm EAT"
    },
    note: "The program on Saturday 16th will start at 9:00am EAT.",
    monthYear: "AUGUST, 2025",
    tag: "ALL ARE WELCOMED",
    vision: "Empowered by the Spirit of God, we envision a gathering where hearts are revived, dry bones live again, and the breath of the Lord brings renewal to every soul. Guided by the theme ‘Let the Wind Blow’ (Ezekiel 37:9), this camp meeting seeks to awaken spiritual passion, ignite fresh fire for mission, and release a mighty move of the Holy Spirit that transforms lives, families, and communities for the glory of God.",
    mission: "Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel of the Three Angels' Messages in preparation for His soon return (Matt 28:18-20, Acts 1:8, Rev 14:6-12).",
    image: campPoster,
  },
  {
    id: 3,
    status: 'upcoming',
    title: "Annual Thanksgiving",
    subtitle: "Count Your Blessings",
    scripture: "1 Thessalonians 5:18",
    dateRange: "23rd - 25th November 2025",
    times: {
      sabbath: "8:30am - 2:00pm EAT",
      otherDays: "10:00am - 1:00pm EAT"
    },
    note: "Special guest speaker: Pastor John Mwangi from conference office",
    monthYear: "NOVEMBER, 2025",
    tag: "THANKS",
    vision: "Cultivating a spirit of gratitude among believers as we recognize God's continual provision in our lives and community.",
    mission: "Create opportunities for members to share testimonies of God's faithfulness and to express thankfulness through worship, fellowship, and giving.",
    image: campPoster,
  }
];

const Event = () => {
  const [currentEvent, setCurrentEvent] = useState(2); // Default to ongoing/latest event
  const totalEvents = EVENTS_DATA.length;

  const handlePrev = () => setCurrentEvent(prev => (prev > 1 ? prev - 1 : totalEvents));
  const handleNext = () => setCurrentEvent(prev => (prev < totalEvents ? prev + 1 : 1));

  const event = EVENTS_DATA.find(e => e.id === currentEvent) || EVENTS_DATA[0];

  // Status color mapping using design tokens
  const statusColors = {
    past: "bg-gray-500",
    ongoing: "bg-green-500",
    upcoming: "bg-primary-500"
  };

  return (
    <div className="section-container bg-gray-50/50 min-h-screen pt-8">
      <div className="content-container">
        
        {/* Header */}
        <header className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-primary-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Church Events
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join us in fellowship, growth, and community engagement.
          </motion.p>
        </header>

        <motion.div 
          className="flex flex-col lg:flex-row gap-0 bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {/* Left: Event Poster */}
          <div className="relative lg:w-1/2 min-h-[300px] md:min-h-[500px]">
            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Event status badge */}
            <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-white text-sm font-bold tracking-wider uppercase shadow-md ${statusColors[event.status]}`}>
              {event.status}
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-6 z-10">
              <button 
                onClick={handlePrev}
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-primary-700 p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Previous event"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={handleNext}
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-primary-700 p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Next event"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Gradient overlay for bottom arrow contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Right: Event Details */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
            {/* Event header */}
            <div className="mb-8">
              <div className="text-sm font-bold text-secondary-600 tracking-widest uppercase mb-2">
                {event.monthYear}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {event.title}
              </h2>
              <p className="text-xl text-primary-600 font-medium mb-3">
                {event.subtitle}
              </p>
              <div className="inline-block bg-gray-100 rounded-lg px-3 py-1">
                <p className="text-gray-700 italic text-sm font-medium">
                  {event.scripture}
                </p>
              </div>
            </div>
            
            {/* Date and time */}
            <div className="mb-8">
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full -mr-12 -mt-12 blur-xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.dateRange}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-primary-800 text-sm">
                        <span className="font-semibold inline-block w-20">Sabbath:</span> {event.times.sabbath}
                      </p>
                      <p className="text-primary-800 text-sm">
                        <span className="font-semibold inline-block w-20">Other Days:</span> {event.times.otherDays}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white text-primary-700 px-4 py-1.5 rounded-full text-center shadow-sm text-sm font-bold tracking-wider border border-primary-100 self-start">
                    {event.tag}
                  </div>
                </div>
              </div>
              
              {event.note && (
                <div className="mt-4 flex items-start p-4 rounded-xl bg-amber-50 text-amber-800 text-sm font-medium border border-amber-100">
                  <svg className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.note}
                </div>
              )}
            </div>
            
            {/* Vision and Mission */}
            <div className="grid grid-cols-1 gap-6 mt-auto">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <span className="w-1.5 h-6 bg-secondary-500 rounded-full mr-3"></span>
                  Vision
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{event.vision}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <span className="w-1.5 h-6 bg-primary-500 rounded-full mr-3"></span>
                  Mission
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{event.mission}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Event pagination - CSS truncation for mobile */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {EVENTS_DATA.map((evt) => (
            <button
              key={evt.id}
              onClick={() => setCurrentEvent(evt.id)}
              className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                currentEvent === evt.id 
                  ? 'bg-primary-600 text-white shadow-md transform -translate-y-0.5' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 ${
                evt.status === 'past' ? 'bg-gray-400' :
                evt.status === 'ongoing' ? 'bg-green-500' : 'bg-primary-500'
              }`}></span>
              {/* CSS truncation handles mobile overflow automatically */}
              <span className="truncate max-w-[120px] sm:max-w-none">
                {evt.title}
              </span>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Event;