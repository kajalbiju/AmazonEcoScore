import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        About Amazon EcoScore
      </h1>
      
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Amazon EcoScore is dedicated to promoting sustainable shopping practices by providing
          environmental impact analysis for products on Amazon. We believe that informed
          consumers can make better choices for our planet.
        </p>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Our platform analyzes various factors including:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
          <li>Product packaging and materials</li>
          <li>Manufacturing processes</li>
          <li>Shipping distance and methods</li>
          <li>Company sustainability practices</li>
        </ul>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Start analyzing products today and contribute to a more sustainable future.
          Track your progress, compete with others, and make a real difference.
        </p>
      </div>
    </div>
  );
};

export default About; 