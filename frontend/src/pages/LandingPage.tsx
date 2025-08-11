/**
 * LandingPage.tsx
 * PURPOSE:
 *  - Entry point for users to choose between Player and Admin modes.
 *  - Simple, clean design with two primary action buttons.
 *
 * UI:
 *  - Game title/logo
 *  - "Play" button → navigates to /play
 *  - "Admin" button → navigates to /admin/login
 *
 * STYLING:
 *  - Dark theme, centered layout
 *  - Impressive visual design with hover effects
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    try {
      navigate('/play');
    } catch (error) {
      alert('Failed to navigate to player menu. Please try again.');
    }
  };

  const handleAdminClick = () => {
    try {
      navigate('/admin/login');
    } catch (error) {
      alert('Failed to navigate to admin panel. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="text-center animate-fade-in">
        {/* Game Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            STORY RPG
          </h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            A story-based turn-based RPG adventure with deep character customization and strategic combat
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={handlePlayClick}
            className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-xl text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-purple-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <span className="relative">🎮 Play Game</span>
          </button>

          <button
            onClick={handleAdminClick}
            className="group relative px-12 py-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg font-bold text-xl text-white shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 hover:from-gray-600 hover:to-gray-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <span className="relative">⚙️ Admin Panel</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>Choose your path to begin the adventure</p>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default LandingPage;