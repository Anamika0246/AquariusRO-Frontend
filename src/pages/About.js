import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Aquarius RO is a premium water delivery service based near IIT Kanpur, providing pure and safe drinking water to homes and offices.
                Founded by Anuj Rai, we are committed to delivering the highest quality water using state-of-the-art RO technology.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400">
                To provide clean, safe, and affordable drinking water to every household and office in our service area.
                We believe that access to pure water is a fundamental right and we're dedicated to making it a reality.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>State-of-the-art RO purification</li>
                <li>24/7 customer support</li>
                <li>Flexible delivery options</li>
                <li>Competitive pricing</li>
                <li>Environmentally friendly practices</li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                to="/contact"
                className="bg-aquarius-dark text-white px-6 py-3 rounded-full hover:bg-aquarius-light transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
