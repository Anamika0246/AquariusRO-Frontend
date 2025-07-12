import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Services = () => {
  const serviceTypes = [
    {
      title: 'Party Aqua',
      description: 'Perfect for events and celebrations',
      icon: '🎉',
      price: 'Price available after login',
    },
    {
      title: 'Workplace Hydro',
      description: 'Keep your office hydrated',
      icon: '🏢',
      price: 'Price available after login',
    },
    {
      title: 'Daily Pure',
      description: 'Home delivery made easy',
      icon: '🏠',
      price: 'Price available after login',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Our Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceTypes.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl text-aquarius-dark">{service.icon}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-aquarius-dark">{service.price}</span>
                <Link
                  to="/order"
                  className="text-aquarius-light hover:text-aquarius-dark transition duration-300 flex items-center"
                >
                  Order Now
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
