/**
 * PlayerMenu.tsx
 * PURPOSE:
 *  - Entry screen after clicking "Play" on landing.
 *  - Shows two primary actions:
 *      1) New Game → goes to /player/new
 *      2) Continue  → (hidden for now as requested) later lists saved profiles from players.json
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    try {
      navigate('/player/new');
    } catch (error) {
      alert('Failed to navigate to new game screen. Please try again.');
    }
  };

  const handleBack = () => {
    try {
      navigate('/');
    } catch (error) {
      alert('Failed to navigate back to main menu. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container max-w-2xl mx-auto text-center animate-slide-in">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Play Game
          </h1>
          <p className="text-xl text-gray-300">
            Start your adventure or continue your journey
          </p>
        </div>

        {/* Menu Options */}
        <div className="space-y-6">
          <button
            onClick={handleNewGame}
            className="w-full max-w-md mx-auto block group relative px-8 py-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-bold text-xl text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:from-green-500 hover:to-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-3">
              <span className="text-2xl">⚔️</span>
              New Game
            </span>
          </button>

          {/* Continue button - hidden for now as requested */}
          {false && (
            <button
              disabled
              className="w-full max-w-md mx-auto block px-8 py-6 bg-gray-700 rounded-lg font-bold text-xl text-gray-400 shadow-lg opacity-50 cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">📖</span>
                Continue (Coming Soon)
              </span>
            </button>
          )}

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium text-white transition-colors duration-200"
          >
            ← Back to Main Menu
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>Begin your epic story-driven adventure</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerMenu;