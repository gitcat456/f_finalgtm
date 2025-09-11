
import { Church, Groups, LibraryBooks, Mic, VolunteerActivism, WavingHand, AccessTime, CalendarToday } from '@mui/icons-material';

const Home = () => {
  const serviceTimes = [
    {
      title: "Sunday Worship Service",
      time: "10:00 AM - 12:00 PM",
      description: "Join us for our main worship service with inspiring music and biblical teaching",
      icon: <Church sx={{ fontSize: 40, color: '#3f51b5' }} />,
      highlight: true
    },
    {
      title: "Youth Service",
      time: "Fridays 6:00 PM - 8:00 PM",
      description: "Dynamic worship and relevant teaching for youth and young adults",
      icon: <Groups sx={{ fontSize: 40, color: '#f50057' }} />
    },
    {
      title: "Bible Education",
      time: "Wednesdays 7:00 PM - 8:30 PM",
      description: "Deep dive into Scripture with our mid-week Bible study",
      icon: <LibraryBooks sx={{ fontSize: 40, color: '#ff9800' }} />
    },
    {
      title: "Prayer & Worship",
      time: "Tuesdays 6:30 PM - 7:30 PM",
      description: "Corporate prayer and intimate worship time",
      icon: <WavingHand sx={{ fontSize: 40, color: '#4caf50' }} />
    },
    {
      title: "Announcements",
      time: "Sundays 9:45 AM",
      description: "Weekly updates and church family news",
      icon: <Mic sx={{ fontSize: 40, color: '#9c27b0' }} />
    },
    {
      title: "Offerings",
      time: "During Sunday Service",
      description: "Opportunity to give and support ministry work",
      icon: <VolunteerActivism sx={{ fontSize: 40, color: '#009688' }} />
    }
  ];

  return (
    <>
      <section
        className="bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center text-white px-4"
        style={{
          backgroundImage: `url(/vite.svg)`,
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            “And the Word became flesh and dwelt among us,
          </h1>
          <p className="text-lg md:text-xl mt-4 font-light italic">
            and we have seen His glory, glory as of the only Son from the Father, full of grace and truth.”
            <br />
            — John 1:14
          </p>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Service Times</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us as we gather to worship, learn, and grow together in Christ
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceTimes.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 ${
                  service.highlight ? 'border-2 border-blue-600 ring-4 ring-blue-100' : 'border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <AccessTime className="mr-1 text-sm" />
                      <span className="text-sm">{service.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.highlight && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                    <CalendarToday className="mr-1 text-sm" />
                    Main Service
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Plan Your Visit</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              We'd love to welcome you to our church family. All are welcome regardless of background or belief.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-blue-100">123 Church Street<br />Nairobi, Kenya</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-blue-100">+254 712 345 678<br />info@churchdomain.com</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Children's Ministry</h4>
                <p className="text-blue-100">Available during Sunday service<br />Ages 3-12</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;