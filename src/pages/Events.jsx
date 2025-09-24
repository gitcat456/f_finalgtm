// Event.jsx
import React, { useState, useEffect } from 'react';
import campPoster from '../assets/event2.jpg';
import youthCampPoster from '../assets/event1.jpg';

const Event = () => {
  const [currentEvent, setCurrentEvent] = useState(2); // Default to ongoing event
  const [isMobile, setIsMobile] = useState(false);
  const totalEvents = 3;

  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkIfMobile();
      
      // Add event listener
      window.addEventListener('resize', checkIfMobile);
      
      // Clean up
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  const events = [
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

  const handlePrev = () => {
    setCurrentEvent(prev => (prev > 1 ? prev - 1 : totalEvents));
  };

  const handleNext = () => {
    setCurrentEvent(prev => (prev < totalEvents ? prev + 1 : 1));
  };

  const event = events.find(e => e.id === currentEvent) || events[0];

  // Status color mapping
  const statusColors = {
    past: "bg-gray-500",
    ongoing: "bg-green-500",
    upcoming: "bg-blue-500"
  };

  return (
    <div className="max-w-6xl mx-auto p-4 overflow-x-hidden">
      {/* Header */}
      <header className="text-center mb-6 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">Church Events Section</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-indigo-600">View Our Events</h2>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left: Event Poster */}
        <div className="relative lg:w-1/2">
          <div className="relative h-full">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]"
            />
            
            {/* Event status badge */}
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold ${statusColors[event.status]}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button 
                onClick={handlePrev}
                className="bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={handleNext}
                className="bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right: Event Details */}
        <div className="lg:w-1/2 p-5 md:p-8 flex flex-col">
          {/* Event header */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-800">{event.title}</h3>
            <p className="text-lg md:text-xl text-indigo-600 mt-1 md:mt-2">{event.subtitle}</p>
            <p className="text-indigo-500 italic text-sm md:text-base mt-1">{event.scripture}</p>
          </div>
          
          {/* Date and time */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-indigo-50 p-4 rounded-lg">
              <div className="mb-2 md:mb-0">
                <p className="text-base md:text-lg font-semibold text-indigo-700">{event.dateRange}</p>
                <p className="text-gray-700 mt-1 md:mt-2 text-sm md:text-base">
                  <span className="font-medium">Sabbath:</span> {event.times.sabbath}
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-medium">Sunday - Friday:</span> {event.times.otherDays}
                </p>
              </div>
              <div className="bg-indigo-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-center mt-2 md:mt-0">
                <p className="font-bold text-sm md:text-base">{event.tag}</p>
              </div>
            </div>
            
            {event.note && (
              <div className="mt-3 md:mt-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700 italic text-sm md:text-base">{event.note}</p>
              </div>
            )}
          </div>
          
          {/* Month/year */}
          <div className="mb-4 md:mb-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold uppercase text-indigo-800 tracking-wide">
              {event.monthYear}
            </h3>
          </div>
          
          {/* Vision and Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-grow">
            <div className="bg-blue-50 p-4 md:p-5 rounded-xl border-l-4 border-blue-500">
              <h3 className="text-lg md:text-xl font-bold text-blue-700 mb-2 md:mb-3">Vision</h3>
              <p className="text-gray-700 text-sm md:text-base">{event.vision}</p>
            </div>
            
            <div className="bg-green-50 p-4 md:p-5 rounded-xl border-l-4 border-green-500">
              <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2 md:mb-3">Mission</h3>
              <p className="text-gray-700 text-sm md:text-base">{event.mission}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event pagination - Fixed for mobile */}
      <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8">
        {events.map((evt) => (
          <button
            key={evt.id}
            onClick={() => setCurrentEvent(evt.id)}
            className={`flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors ${
              currentEvent === evt.id 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${
              evt.status === 'past' ? 'bg-gray-500' :
              evt.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'
            }`}></span>
            <span className="truncate max-w-[100px] md:max-w-none">
              {isMobile ? evt.title.split(' ')[0] + (evt.title.includes(' ') ? '...' : '') : evt.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Event;