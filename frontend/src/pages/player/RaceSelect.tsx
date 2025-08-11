/**
 * RaceSelect.tsx
 * PURPOSE:
 *  - Let the player choose a Race defined by admin.
 *  - Displays tarot-style Race cards with stats, elements, and abilities.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { useDataContext } from '../../contexts/DataContext';

const RaceSelect: React.FC = () => {
  const navigate = useNavigate();
  const { player, setRace, isLoading: playerLoading } = usePlayerContext();
  const { races, abilities, isLoading: dataLoading } = useDataContext();
  const [selectedRaceId, setSelectedRaceId] = useState<string>('');

  useEffect(() => {
    if (!player) {
      alert('No player found. Please create a character first.');
      navigate('/player/new');
    }
  }, [player, navigate]);

  const handleNext = async () => {
    if (!selectedRaceId) {
      alert('Please select a race.');
      return;
    }

    try {
      await setRace(selectedRaceId);
      navigate('/player/class');
    } catch (error) {
      alert(`Failed to set race: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleBack = () => {
    try {
      navigate('/player/new');
    } catch (error) {
      alert('Failed to navigate back. Please try again.');
    }
  };

  if (!player) {
    return null;
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <p className="text-xl text-white">Loading races...</p>
        </div>
      </div>
    );
  }

  const selectedRace = races.find(r => r.id === selectedRaceId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Choose Your Race
              </h1>
              <p className="text-xl text-gray-300">
                Select the heritage that will shape your character's abilities
              </p>
            </div>

            {/* Race Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {races.map((race) => {
                const raceAbility = race.raceAbilityId ? abilities.find(a => a.id === race.raceAbilityId) : null;
                const isSelected = selectedRaceId === race.id;

                return (
                  <div
                    key={race.id}
                    onClick={() => setSelectedRaceId(race.id)}
                    className={`card card-hover cursor-pointer transition-all duration-300 ${
                      isSelected ? 'card-selected' : ''
                    }`}
                  >
                    {/* Race Image */}
                    {race.asset?.imageUrl && (
                      <div className="mb-4 text-center">
                        <img
                          src={race.asset.imageUrl}
                          alt={race.name}
                          className="w-24 h-24 mx-auto rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Race Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">{race.name}</h3>
                      <p className="text-sm text-gray-400">{race.description}</p>
                    </div>

                    {/* Base Stats */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Base Stats:</h4>
                      <div className="grid grid-cols-4 gap-1 text-xs">
                        {Object.entries(race.baseStats).map(([stat, value]) => (
                          <div key={stat} className="text-center">
                            <div className="text-gray-400 uppercase">{stat}</div>
                            <div className="text-white font-semibold">+{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Elements */}
                    {(race.elements.damage || race.elements.resistance) && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Elements:</h4>
                        <div className="text-xs space-y-1">
                          {race.elements.damage && Object.entries(race.elements.damage).map(([element, value]) => (
                            <div key={element} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{element} DMG:</span>
                              <span className="text-red-400">+{value}%</span>
                            </div>
                          ))}
                          {race.elements.resistance && Object.entries(race.elements.resistance).map(([element, value]) => (
                            <div key={element} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{element} RES:</span>
                              <span className="text-blue-400">+{value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Race Ability */}
                    {raceAbility && (
                      <div className="border-t border-gray-600 pt-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Innate</span>
                          <span className="text-sm font-semibold text-white">{raceAbility.name}</span>
                        </div>
                        <p className="text-xs text-gray-400">{raceAbility.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={playerLoading}
                className="btn btn-secondary"
              >
                ← Back
              </button>
              
              <button
                onClick={handleNext}
                disabled={!selectedRaceId || playerLoading}
                className="btn btn-primary btn-lg"
              >
                {playerLoading ? 'Saving...' : 'Next: Choose Class →'}
              </button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="w-80">
            <div className="card sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">Character Preview</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white ml-2">{player.name}</span>
                </div>
                
                <div>
                  <span className="text-gray-400">Gender:</span>
                  <span className="text-white ml-2 capitalize">{player.gender}</span>
                </div>

                {selectedRace && (
                  <>
                    <div>
                      <span className="text-gray-400">Race:</span>
                      <span className="text-white ml-2">{selectedRace.name}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Total Stats Preview:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(selectedRace.baseStats).map(([stat, raceValue]) => {
                          const baseValue = player.stats[stat as keyof typeof player.stats] || 1;
                          const total = baseValue + raceValue;
                          return (
                            <div key={stat} className="flex justify-between">
                              <span className="text-gray-400 uppercase">{stat}:</span>
                              <span className="text-white">
                                {baseValue} + {raceValue} = <span className="font-semibold">{total}</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceSelect;