import React, { useMemo, memo } from 'react';
import { Church, Groups, LibraryBooks, Mic, VolunteerActivism, WavingHand, AccessTime, CalendarToday } from '@mui/icons-material';
import home from '../assets/home.avif';
import { Link } from "react-router-dom";

// Memoized Service Card Component
const ServiceCard = memo(({ service, index }) => (
  <div 
    key={index} 
    className={`bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:transform hover:-translate-y-1 ${
      service.highlight ? 'border-2 border-primary-600 ring-4 ring-primary-100' : 'border border-gray-200'
    }`}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 bg-primary-50 rounded-lg mr-4">
        {service.icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
          <span className="text-sm">{service.time}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
    {service.highlight && (
      <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center">
        <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
        Main Service
      </div>
    )}
  </div>
));

ServiceCard.displayName = 'ServiceCard';

const Home = () => {
  // Memoize service times to prevent recalculation
  const serviceTimes = useMemo(() => [
    {
      title: "Children & Youth Service",
      time: "Saturday 8:30 AM - 9:15 AM",
      description: "Dynamic worship and relevant teaching for youth and young adults",
      icon: <Groups sx={{ fontSize: 40, color: '#f50057' }} />,
      highlight: false
    },
    {
      title: "Bible Education",
      time: "9:45 AM - 10:45 AM",
      description: "Deep dive into Scripture with our mid-week Bible study",
      icon: <LibraryBooks sx={{ fontSize: 40, color: '#ff9800' }} />,
      highlight: false
    },
    {
      title: "Announcements",
      time: "10:50 AM - 11:00 AM",
      description: "Weekly updates and church family news",
      icon: <Mic sx={{ fontSize: 40, color: '#9c27b0' }} />,
      highlight: false
    },
    {
      title: "Offerings",
      time: "11:10 AM - 11:30 AM",
      description: "Opportunity to give and support ministry work",
      icon: <VolunteerActivism sx={{ fontSize: 40, color: '#009688' }} />,
      highlight: false
    },
    {
      title: "Prayer & Worship",
      time: "11:30 AM - 12:00 AM",
      description: "Corporate prayer and intimate worship time",
      icon: <WavingHand sx={{ fontSize: 40, color: '#4caf50' }} />,
      highlight: false
    },
    {
      title: "Saturday Worship Service",
      time: "12:00 NOON - 1:00 PM",
      description: "Join us for our main worship service with inspiring music and biblical teaching",
      icon: <Church sx={{ fontSize: 40, color: '#3730a3' }} />,
      highlight: true
    }
  ], []);

  return (
    <>
      {/* Hero Section with optimized background image */}
      <section
        className="hero-section bg-center bg-cover relative text-white px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${home})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-lg max-w-3xl text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug animate-fade-in">
            "And the Word became flesh and dwelt among us,
          </h1>
          <p className="text-lg md:text-xl mt-4 font-light italic leading-relaxed">
            and we have seen His glory, glory as of the only Son from the Father, full of grace and truth."
            <br />
            <span className="text-sm mt-2 block">— John 1:14</span>
          </p>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">Service Times</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us as we gather to worship, learn, and grow together in Christ
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mt-8 rounded-full"></div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {serviceTimes.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-elevated">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Us?</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              We'd love to welcome you to our church family. All are welcome regardless of background or belief.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/locations"
                className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Locations
              </Link>
              <Link
                to="/events"
                className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Home);

