import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-down">
          Bridging Communication Through <span className="text-blue-600 dark:text-blue-400">Sign Language AI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 animate-fade-in-up">
          Empowering communication with an intelligent sign language interpreter built with deep learning.
          Connect, learn, and express like never before.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Start Interpreting
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg border border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Learn More
          </Link>
        </div>
      </div>
      {/* Placeholder for a visually engaging graphic/illustration */}
    </div>
  );
}; 