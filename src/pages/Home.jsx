import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Church, Groups, LibraryBooks, Mic, VolunteerActivism, WavingHand, AccessTime, CalendarToday } from '@mui/icons-material';
import home from '../assets/home.avif';
import { Link } from "react-router-dom";

// Shared animation variants
const fadeSlideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// Stagger container for section headers
const sectionHeaderContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const headingReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const dividerGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Memoized Service Card Component with scroll animation
const ServiceCard = memo(({ service, index }) => (
  <motion.div
    variants={fadeSlideUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{
      duration: 0.5,
      ease: 'easeOut',
      delay: index * 0.09,
    }}
    className={`service-card ${
      service.highlight ? 'border-2 border-primary-600 ring-4 ring-primary-100' : 'border border-gray-200'
    }`}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 bg-primary-50 rounded-lg mr-4 text-primary-600">
        {service.icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
          <span className="text-sm font-medium">{service.time}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
    {service.highlight && (
      <div className="bg-primary-100 text-primary-800 px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center">
        <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
        Main Service
      </div>
    )}
  </motion.div>
));

ServiceCard.displayName = 'ServiceCard';

const Home = () => {
  // Memoize service times to prevent recalculation
  const serviceTimes = useMemo(() => [
    {
      title: "Children & Youth Service",
      time: "Saturday 8:30 AM - 9:15 AM",
      description: "Dynamic worship and relevant teaching for youth and young adults",
      icon: <Groups sx={{ fontSize: 40 }} />,
      highlight: false
    },
    {
      title: "Bible Education",
      time: "9:45 AM - 10:45 AM",
      description: "Deep dive into Scripture with our mid-week Bible study",
      icon: <LibraryBooks sx={{ fontSize: 40 }} />,
      highlight: false
    },
    {
      title: "Announcements",
      time: "10:50 AM - 11:00 AM",
      description: "Weekly updates and church family news",
      icon: <Mic sx={{ fontSize: 40 }} />,
      highlight: false
    },
    {
      title: "Offerings",
      time: "11:10 AM - 11:30 AM",
      description: "Opportunity to give and support ministry work",
      icon: <VolunteerActivism sx={{ fontSize: 40 }} />,
      highlight: false
    },
    {
      title: "Prayer & Worship",
      time: "11:40 AM - 12:10 PM",
      description: "Corporate prayer and intimate worship time",
      icon: <WavingHand sx={{ fontSize: 40 }} />,
      highlight: false
    },
    {
      title: "Saturday Worship Service",
      time: "12:20 PM - 1:30 PM",
      description: "Join us for our main worship service with inspiring music and biblical teaching",
      icon: <Church sx={{ fontSize: 40 }} />,
      highlight: true
    }
  ], []);

  return (
    <>
      {/* Hero Section with optimized background image - Parallax removed for iOS Safari performance */}
      <section
        className="hero-section bg-center bg-cover relative text-white px-4"
        style={{
          backgroundImage: `url(${home})`,
          // Removed backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/40"></div>
        
        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl max-w-4xl text-center z-10 border border-white/10 shadow-2xl">
          <motion.blockquote 
            className="animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              "And the Word became flesh and dwelt among us, and we have seen His glory..."
            </h1>
            <p className="text-xl md:text-2xl font-light italic leading-relaxed text-gray-200">
              glory as of the only Son from the Father, full of grace and truth.
            </p>
            <footer className="mt-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold tracking-widest uppercase">
                John 1:14
              </span>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="section-container bg-gradient-to-b from-gray-50 to-white">
        <div className="content-container">
          {/* Section Header — staggered cinematic reveal */}
          <motion.div
            className="text-center mb-16"
            variants={sectionHeaderContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-primary-900 mb-4 tracking-tight"
              variants={headingReveal}
            >
              Service Times
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={subtitleReveal}
            >
              Join us as we gather to worship, learn, and grow together in Christ
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mt-8 rounded-full origin-center"
              variants={dividerGrow}
            />
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {serviceTimes.map((service, index) => (
               <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* CTA Section — fade + slide up */}
          <motion.div
            className="bg-gradient-to-br from-primary-700 to-secondary-800 rounded-3xl p-10 md:p-16 text-white text-center shadow-elevated relative overflow-hidden"
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight relative z-10">Ready to Join Us?</h3>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-primary-100 relative z-10 font-light leading-relaxed">
              We'd love to welcome you to our church family. All are welcome regardless of background or belief.
            </p>
            <div className="flex flex-wrap gap-5 justify-center relative z-10">
              <Link
                to="/locations"
                className="btn-base bg-white text-primary-700 hover:bg-gray-50 hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg px-8 py-3.5"
              >
                View Locations
              </Link>
              <Link
                to="/events"
                className="btn-base bg-secondary-500 text-white hover:bg-secondary-400 hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg px-8 py-3.5"
              >
                Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default memo(Home);
