import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aquarius-dark to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">
                  Aquarius RO - Pure Water, Pure Life
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Get pure and safe drinking water delivered right to your doorstep.
                  Choose from our three convenient services - Party Aqua, Workplace Hydro, and Daily Pure.
                </p>
                <div className="mt-8">
                  <Link
                    to="/services"
                    className="bg-aquarius-light text-white font-bold px-6 py-3 rounded-full hover:bg-aquarius-dark transition duration-300"
                  >
                    View Services
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
                Our Services
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Choose the perfect water delivery service for your needs
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center mt-12">
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="text-aquarius-light p-3 w-12 h-12 mx-auto bg-aquarius-dark rounded-full shadow-lg">
              <GlobeAltIcon className="h-6 w-6" />
            </div>
            <h6 className="text-xl mt-5 font-semibold">
              Party Aqua
            </h6>
            <p className="mt-2 mb-4 text-gray-600 dark:text-gray-400">
              Perfect for events and celebrations
            </p>
          </div>
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="text-aquarius-light p-3 w-12 h-12 mx-auto bg-aquarius-dark rounded-full shadow-lg">
              <GlobeAltIcon className="h-6 w-6" />
            </div>
            <h6 className="text-xl mt-5 font-semibold">
              Workplace Hydro
            </h6>
            <p className="mt-2 mb-4 text-gray-600 dark:text-gray-400">
              Keep your office hydrated
            </p>
          </div>
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="text-aquarius-light p-3 w-12 h-12 mx-auto bg-aquarius-dark rounded-full shadow-lg">
              <GlobeAltIcon className="h-6 w-6" />
            </div>
            <h6 className="text-xl mt-5 font-semibold">
              Daily Pure
            </h6>
            <p className="mt-2 mb-4 text-gray-600 dark:text-gray-400">
              Home delivery made easy
            </p>
          </div>
        </div>
      </div>

      {/* Order Now Button */}
      <div className="container mx-auto px-4 mt-16">
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
