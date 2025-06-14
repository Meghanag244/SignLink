import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 dark:from-gray-900 dark:to-purple-900 flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-down">
          About <span className="text-purple-600 dark:text-purple-400">SignLink</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 animate-fade-in-up">
          SignLink is a pioneering project dedicated to breaking down communication barriers for the deaf and hard-of-hearing community.
          Leveraging cutting-edge deep learning and computer vision technologies, we aim to provide a seamless and intuitive sign language interpretation experience.
        </p>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 animate-fade-in-up">
          Our mission is to foster a more inclusive world where technology empowers every individual to express themselves freely and connect effortlessly.
          We are a passionate team of developers and researchers committed to making a real impact through innovation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg border border-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          >
            Go to App
          </button>
        </div>
      </div>
    </div>
  );
}; 