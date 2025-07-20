import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';


const Footer = () => {
  return (
    <footer className="bg-aquarius-dark text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          
          <div>
            <div className="flex items-center space-x-4 mb-4">
            <img
                className="h-12 w-auto object-contain block dark:hidden"
                src="LOGO.svg"
                alt="Aquarius RO Logo"
            />
            <img
                className="h-12 w-auto object-contain hidden dark:block"
                src="LOGO-DARK.svg"
                alt="Aquarius RO Logo Dark"
            />

              <h3 className="text-xl font-semibold">Aquarius RO</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Providing pure and safe drinking water to homes and offices.
            </p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 mr-2" />
                +91 7985220732
              </p>
              <p className="flex items-center text-gray-300">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Near IIT Kanpur, Uttar Pradesh
              </p>
              <p className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-6 w-6 text-aquarius-dark mr-4" />
                aquarius.ro.anujrai@gmail.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white">Party Aqua</li>
              <li className="text-gray-300 hover:text-white">Workplace Hydro</li>
              <li className="text-gray-300 hover:text-white">Daily Pure</li>
            </ul>
          </div>

          {/* Feedback */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Feedback</h3>
            <p className="text-gray-300 mb-4">
              Share your thoughts and suggestions with us.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-6 w-6 mr-3" />
                <span>Send us an email at:</span>
              </div>
              <a
                href="mailto:aquarius.ro.anujrai@gmail.com"
                className="text-blue-400 hover:text-blue-500 transition duration-300"
              >
                aquarius.ro.anujrai@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aquarius RO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
