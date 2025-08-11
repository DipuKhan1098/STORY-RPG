/**
 * NewGame.tsx
 * PURPOSE:
 *  - Collect basic player identity and create a saved profile.
 *  - Fields:
 *      - Player Name (required)
 *      - Gender (card-style selector: Male / Female with simple tarot-card visual)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../../contexts/PlayerContext';

const NewGame: React.FC = () => {
  const navigate = useNavigate();
  const { createPlayer } = usePlayerContext();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a character name.');
      return;
    }
    
    if (!gender) {
      alert('Please select a gender.');
      return;
    }

    setIsLoading(true);
    try {
      await createPlayer(name.trim(), gender as 'male' | 'female');
      navigate('/player/race');
    } catch (error) {
      alert(`Failed to create character: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    try {
      navigate('/play');
    } catch (error) {
      alert('Failed to navigate back. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container max-w-2xl mx-auto animate-slide-in">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Create Your Character
            </h1>
            <p className="text-gray-300">
              Begin your journey by defining your character's identity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Character Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Character Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Enter your character's name"
                maxLength={30}
                disabled={isLoading}
              />
            </div>

            {/* Gender Selection */}
            <div className="form-group">
              <label className="form-label mb-4">
                Choose Gender
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Male Card */}
                <div
                  onClick={() => !isLoading && setGender('male')}
                  className={`card card-hover cursor-pointer transition-all duration-200 ${
                    gender === 'male' ? 'card-selected' : ''
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">⚔️</div>
                    <h3 className="text-lg font-semibold text-white">Male</h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Strong and determined warrior
                    </p>
                  </div>
                </div>

                {/* Female Card */}
                <div
                  onClick={() => !isLoading && setGender('female')}
                  className={`card card-hover cursor-pointer transition-all duration-200 ${
                    gender === 'female' ? 'card-selected' : ''
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🏹</div>
                    <h3 className="text-lg font-semibold text-white">Female</h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Swift and cunning adventurer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="btn btn-secondary"
              >
                ← Back
              </button>
              
              <button
                type="submit"
                disabled={!name.trim() || !gender || isLoading}
                className="btn btn-primary btn-lg"
              >
                {isLoading ? 'Creating...' : 'Continue →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewGame;