import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, DevicePhoneMobileIcon, ClockIcon, CurrencyRupeeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-10 text-5xl font-bold mb-12 text-center bg-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>

        {/* Marquee Carousel */}
        <div className="overflow-hidden w-full mb-12">
          <div className="flex animate-marquee space-x-12" style={{ minWidth: '1200px' }}>
            <img src="/HOME.svg" alt="Home" className="h-40 w-auto rounded-2xl shadow-lg bg-white p-4" />
            <img src="/OFFICE.svg" alt="Office" className="h-40 w-auto rounded-2xl shadow-lg bg-white p-4" />
            <img src="/PARTY.svg" alt="Party" className="h-40 w-auto rounded-2xl shadow-lg bg-white p-4" />
            <img src="/AquariusROlogo.jpg" alt="Aquarius RO" className="h-40 w-auto rounded-2xl shadow-lg bg-white p-4" />
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
        `}</style>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Our Story */}
          <div className="bg-gradient-to-br from-aquarius-light to-aquarius-dark text-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <GlobeAltIcon className="h-12 w-12 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Our Story</h2>
            <p className="text-center text-lg">
              Aquarius RO is a premium water delivery service based near IIT Kanpur, providing pure and safe drinking water to homes and offices. Founded by Anuj Rai, we are committed to delivering the highest quality water using state-of-the-art RO technology.
            </p>
          </div>
          {/* Our Mission */}
          <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <ClockIcon className="h-12 w-12 text-aquarius-dark dark:text-aquarius-light mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-aquarius-dark dark:text-aquarius-light">Our Mission</h2>
            <p className="text-center text-lg text-gray-700 dark:text-gray-300">
              To provide clean, safe, and affordable drinking water to every household and office in our service area. We believe that access to pure water is a fundamental right and we're dedicated to making it a reality.
            </p>
          </div>
          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-aquarius-dark to-aquarius-light text-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <CheckCircleIcon className="h-12 w-12 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Why Choose Us?</h2>
            <div className="grid grid-cols-1 gap-3 w-full">
              <div className="flex items-center gap-3">
                <DevicePhoneMobileIcon className="h-6 w-6" />
                <span>24/7 customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-6 w-6" />
                <span>Flexible delivery options</span>
              </div>
              <div className="flex items-center gap-3">
                <CurrencyRupeeIcon className="h-6 w-6" />
                <span>Competitive pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-6 w-6" />
                <span>State-of-the-art RO purification</span>
              </div>
              <div className="flex items-center gap-3">
                <GlobeAltIcon className="h-6 w-6" />
                <span>Environmentally friendly practices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="bg-aquarius-dark text-white px-6 py-3 rounded-full hover:bg-aquarius-light transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
