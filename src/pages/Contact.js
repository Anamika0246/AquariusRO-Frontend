import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-10 text-5xl font-bold mb-12 text-center bg-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-aquarius-light/80 to-aquarius-dark/80 text-white rounded-3xl shadow-xl p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <PhoneIcon className="h-7 w-7" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-white/80">+91 1234567890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <EnvelopeIcon className="h-7 w-7" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-white/80">info@aquariusro.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPinIcon className="h-7 w-7" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-white/80">Near IIT Kanpur, Uttar Pradesh</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <GlobeAltIcon className="h-7 w-7" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-white/80">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl p-10">
            <h2 className="text-2xl font-bold mb-6 text-aquarius-dark dark:text-aquarius-light text-center">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aquarius-light focus:ring focus:ring-aquarius-light focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aquarius-light focus:ring focus:ring-aquarius-light focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aquarius-light focus:ring focus:ring-aquarius-light focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark text-white py-3 rounded-md hover:scale-105 transition duration-300 font-semibold shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
