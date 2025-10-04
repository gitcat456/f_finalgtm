// src/pages/Socials.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SocialsPage = () => {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, platform) => {
    navigator.clipboard.writeText(text);
    setCopied(platform);
    setTimeout(() => setCopied(null), 2000);
  };

  const socialLinks = [
    {
      id: 1,
      platform: 'Facebook',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Follow us on Facebook for daily inspiration, event updates, and live streams of our services.',
      link: 'https://www.facebook.com/profile.php?id=100064719998736',
      actionText: 'Follow our Page',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 2,
      platform: 'YouTube',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Subscribe to our YouTube channel for sermon recordings, worship sessions, and inspirational messages.',
      link: 'https://www.youtube.com/@graceandtruthministriesglobal',
      actionText: 'Subscribe',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 3,
      platform: 'WhatsApp (Youth Group)',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.49" />
        </svg>
      ),
      description: 'Join our youth WhatsApp group for fellowship, discussions, and event coordination.',
  
      link: 'https://chat.whatsapp.com/C0eSzXVdetM5y4reZnzoJq?mode=ems_copy_t',
      actionText: 'Join Youth Group',
      color: 'bg-green-600 hover:bg-green-700',
      isWhatsApp: true
    },
    {
      id: 4,
      platform: 'WhatsApp (General Conference)',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.49" />
        </svg>
      ),
      description: 'Join our general conference WhatsApp group for church-wide announcements and discussions.',
      link: 'https://chat.whatsapp.com/JJnmLEur8OyKkFWOS6tDY8?mode=ems_copy_t',
      actionText: 'Join General Group',
      color: 'bg-green-600 hover:bg-green-700',
      isWhatsApp: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-95"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
            style={{ backgroundImage: "url('/src/assets/praise.png')" }}
          ></div>
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
                Connect With Us
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                Stay connected with Grace and Truth Ministries through our social media platforms
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">Our Social Platforms</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow us on social media to stay updated with our events, sermons, and community activities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-full ${social.color.replace('hover:', '').replace('700', '100')} text-white`}>
                      {social.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-800 ml-4">{social.platform}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {social.description}
                  </p>
                  
                  {social.isWhatsApp ? (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          One-Click Join
                        </h4>
                        <p className="text-green-700 text-sm">
                          Click below to instantly join our WhatsApp group. No need to save contacts or send messages!
                        </p>
                      </div>
                      
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full ${social.color} text-white py-3 rounded-lg font-semibold transition flex items-center justify-center`}
                      >
                        {social.actionText}
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${social.color} text-white py-3 rounded-lg font-semibold transition flex items-center justify-center`}
                    >
                      {social.actionText}
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp Instructions Section 
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">How to Get Your WhatsApp Group Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-4">For Group Admins:</h4>
                <ol className="space-y-3 text-green-800">
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">1</span>
                    Open the WhatsApp group
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">2</span>
                    Tap the group name → <strong>Invite to group</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">3</span>
                    Tap <strong>Share link</strong> → <strong>Copy link</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">4</span>
                    Replace the placeholder links in the code with your actual group links
                  </li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-700 mb-4">How It Works for Users:</h4>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Clicking the button opens WhatsApp directly to the group join screen</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Users see the group info and can join with one tap</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No need to save contacts or send messages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          
          {/* Copy Success Message */}
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              Copied to clipboard!
            </motion.div>
          )}

          {/* Additional Information */}
          <div className="mt-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Stay Connected</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-4">Why Follow Us?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get updates about upcoming events and services</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Watch sermons and worship sessions anytime</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Connect with other church members</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Receive daily inspiration and devotionals</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-indigo-700 mb-4">Need Help?</h4>
                <p className="text-gray-700 mb-4">
                  If you're having trouble joining any of our groups or connecting with us on social media, please contact our media team for assistance.
                </p>
                <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-4 rounded-lg">
                  <p className="text-indigo-800 font-medium">Media Team Contact:</p>
                  <p className="text-indigo-600">migirecomputers@gmail.com</p>
                  <p className="text-indigo-600">+254 790 526 387</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialsPage;