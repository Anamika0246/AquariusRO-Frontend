import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-aquarius-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Aquarius RO</h3>
            <p className="text-gray-300 mb-4">
              Providing pure and safe drinking water to homes and offices.
            </p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 mr-2" />
                +91 1234567890
              </p>
              <p className="flex items-center text-gray-300">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Near IIT Kanpur, Uttar Pradesh
              </p>
              <p className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-6 w-6 text-aquarius-dark mr-4" />
                info@aquariusro.com
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

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="bg-aquarius-light text-white px-4 py-2 rounded-md hover:bg-aquarius-dark transition duration-300"
              >
                Subscribe
              </button>
            </form>
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
