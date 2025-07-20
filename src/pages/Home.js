import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import BubblesBackground from '../components/BubblesBackground'; // adjust path if needed

// import homeIcon from '../assets/homeicon.jpg';
// import officeIcon from '../assets/officeicon.jpg';
// import partyIcon from '../assets/partyicon.jpg';
// import LOGO from '../assets/LOGO.svg';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aquarius-dark to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      {/* Hero Section */}
      {/* Hero Section */}
<div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75 mt-10">
  {/* Background Effects */}
  <div className="absolute top-0 w-full h-full z-0">
    <BubblesBackground />
    <span
      id="blackOverlay"
      className="w-full h-full absolute opacity-75 bg-slate-800 dark:bg-black z-0"
    ></span>
  </div>

        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12 mt-5">
              <h1 className="animated-gradient-heading text-5xl sm:text-6xl font-extrabold text-center tracking-wide bg-clip-text text-transparent text-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark">
                Experience Hydration at its Purest!
              </h1>

              <p className="mt-4 text-xl text-gray-300 bg-clip-text ">
                "Welcome to Aquarius RO Water Suppliers, a refreshing oasis brought to you by Rai Enterprises. Satisfy your thirst with our premium purified water, ensuring purity and hydration in every drop."
              </p>
              <div className="mt-10">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-aquarius-dark via-aquarius-light to-aquarius-dark backdrop-blur-sm hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Get it for Yourself
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-aquarius-light fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      {/* Services Teaser */}
        <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
            <div className="text-center">
              <h3 className="text-3xl font-semibold">
                Services We Offer
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Choose any of the following categories as per your need!
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center mt-12">
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative group">
              <div className="h-64 w-full rounded-lg shadow-2xl transform transition-all duration-300 group-hover:scale-105 dark:shadow-gray-600">
                <img src="HOME.svg" alt="Home" className="w-full h-64 object-contain" />
              </div>
              <h6 className="mt-7 text-xl font-semibold">
                Everyday Pure
              </h6>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                "Get RO water cans on daily basis at minimal rates."
              </p>
            </div>
          </div>
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative group">
              <div className="h-64 w-full rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 dark:shadow-gray-600">
                <img src="OFFICE.svg" alt="Office" className="h-64 w-full object-contain" />
              </div>
              <h6 className="mt-7 text-xl font-semibold">
                Workplace Hydro
              </h6>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                "Get RO water cans at your office with zero transportation charges."
              </p>
            </div>
          </div>
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative group">
              <div className="h-64 w-full rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 dark:shadow-gray-600">
                <img src="PARTY.svg" alt="Party" className="w-full h-64 object-contain" />
              </div>
              <h6 className="mt-7 text-xl font-semibold">
                Party Aqua
              </h6>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                "Get RO water cans for your events and celebrations."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Now Button */}
      <div className="container mx-auto px-4 mt-16 mb-10">
        <div className="flex justify-center">
          <Link
            to="/order"
            className="bg-aquarius-dark text-white font-bold px-8 py-4 rounded-full hover:bg-aquarius-light transition duration-300 flex items-center"
          >
            Order Now
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
