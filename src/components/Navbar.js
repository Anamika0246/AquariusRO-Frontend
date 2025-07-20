import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { UserCircleIcon, MoonIcon, SunIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';


const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const themeIcon = isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />;

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-12">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-16 w-auto object-contain block dark:hidden"
                src="LOGO.svg"
                alt="Aquarius RO Logo"
              />
              <img
                className="h-16 w-auto object-contain hidden dark:block"
                src="LOGO-DARK.svg"
                alt="Aquarius RO Logo Dark"
              />
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-8 flex-1 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition duration-300"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition duration-300"
            >
              Contact
            </Link>

          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white transition duration-300"
            >
              {themeIcon}
            </button>
            <Link
              to="/profile"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white transition duration-300"
            >
              <UserCircleIcon className="h-6 w-6" />
            </Link>
            {/* Mobile Menu Button */}
            <div className="sm:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-aquarius-light"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 max-w-xs w-full h-full bg-gray-900 dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <img
                  src="LOGO.svg"
                  alt="Aquarius RO Logo"
                  className="h-12 w-auto"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex items-center space-x-4 mt-8">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md text-gray-300 hover:text-white transition duration-300"
                  >
                    {themeIcon}
                  </button>
                  <Link
                    to="/profile"
                    className="p-2 rounded-md text-gray-300 hover:text-white transition duration-300"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
