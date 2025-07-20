import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Services = () => {
  const serviceTypes = [
    {
      title: 'Party Aqua',
      description: 'Perfect for events and celebrations',
      icon: '/PARTY.svg',
    },
    {
      title: 'Workplace Hydro',
      description: 'Keep your office hydrated',
      icon: '/OFFICE.svg',
    },
    {
      title: 'Daily Pure',
      description: 'Home delivery made easy',
      icon: '/HOME.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white dark:from-gray-800 to-gray-50 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" pt-10 text-5xl font-bold mb-12 text-center bg-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark bg-clip-text text-transparent"
        >
          Our Services
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {serviceTypes.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-700 rounded-3xl hover:shadow-slate-800 min-h-[22rem] p-10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={service.icon} 
                  alt={service.title}
                  className="w-full h-48 object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-center text-gray-900 dark:text-white">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{service.description}</p>
              <div className="flex items-center justify-center">
                <span className="font-semibold text-aquarius-dark dark:text-aquarius-light mr-4">{service.price}</span>
                <Link
                  to="/order"
                  className="text-aquarius-light hover:text-aquarius-dark transition duration-300 flex items-center text-xl"
                >
                  Order Now
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

