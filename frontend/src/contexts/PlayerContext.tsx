/**
 * PlayerContext.tsx
 * PURPOSE:
 *  - Global React Context for the *current* player's full profile and runtime state.
 *  - Accessible in all game-related components (story, battle, shop, inventory, etc.).
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

// Define Player type based on the backend schema
interface Player {
  id: string;
  name: string;
  gender: 'male' | 'female';
  raceId?: string | null;
  classId?: string | null;
  level: number;
  currentXP: number;
  neededXP: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  stats: {
    str: number;
    int: number;
    wis: number;
    end: number;
    dex: number;
    agi: number;
    luck: number;
    char: number;
  };
  elements: {
    damage: Record<string, number>;
    resistance: Record<string, number>;
  };
  spells: string[];
  skills: string[];
  abilities: string[];
  inventory: { itemId: string; qty: number }[];
  equipped: {
    head?: string | null;
    body?: string | null;
    leg?: string | null;
    shoe?: string | null;
    mainWeapon?: string | null;
    offWeapon?: string | null;
    ringLeft?: string | null;
    ringRight?: string | null;
    necklace?: string | null;
    potion1?: { itemId: string; qty: number } | null;
    potion2?: { itemId: string; qty: number } | null;
  };
  gold: number;
  currentStoryNodeId?: string | null;
  activeQuestState?: Record<string, unknown>;
  summons?: { monsterId: string; hp: number; durationTurns?: number }[];
}

interface PlayerContextType {
  player: Player | null;
  isLoading: boolean;
  loadPlayer: (id: string) => Promise<void>;
  createPlayer: (name: string, gender: 'male' | 'female') => Promise<void>;
  updatePlayer: (data: Partial<Player>) => Promise<void>;
  setRace: (raceId: string) => Promise<void>;
  setClass: (classId: string) => Promise<void>;
  equipItem: (slot: string, itemId: string | null) => Promise<void>;
  useItem: (itemId: string) => Promise<void>;
  addXP: (amount: number) => void;
  updateHP: (amount: number) => void;
  useMana: (amount: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const loadPlayer = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/players/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to load player: ${response.statusText}`);
      }
      const playerData = await response.json();
      setPlayer(playerData);
    } catch (error) {
      throw new Error(`Failed to load player: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  const createPlayer = useCallback(async (name: string, gender: 'male' | 'female') => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, gender }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to create player: ${response.statusText}`);
      }
      
      const newPlayer = await response.json();
      setPlayer(newPlayer);
    } catch (error) {
      throw new Error(`Failed to create player: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  const updatePlayer = useCallback(async (data: Partial<Player>) => {
    if (!player) {
      throw new Error('No player loaded');
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/players/${player.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update player: ${response.statusText}`);
      }
      
      const updatedPlayer = await response.json();
      setPlayer(updatedPlayer);
    } catch (error) {
      throw new Error(`Failed to update player: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [player, API_BASE_URL]);

  const setRace = useCallback(async (raceId: string) => {
    await updatePlayer({ raceId });
  }, [updatePlayer]);

  const setClass = useCallback(async (classId: string) => {
    await updatePlayer({ classId });
  }, [updatePlayer]);

  const equipItem = useCallback(async (slot: string, itemId: string | null) => {
    if (!player) {
      throw new Error('No player loaded');
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/players/${player.id}/equip`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slot, itemId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to equip item: ${response.statusText}`);
      }
      
      const updatedPlayer = await response.json();
      setPlayer(updatedPlayer);
    } catch (error) {
      throw new Error(`Failed to equip item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [player, API_BASE_URL]);

  const useItem = useCallback(async (itemId: string) => {
    if (!player) {
      throw new Error('No player loaded');
    }

    // This would be implemented when the backend supports item usage
    throw new Error('Item usage not yet implemented');
  }, [player]);

  const addXP = useCallback((amount: number) => {
    if (!player) return;
    
    const newXP = player.currentXP + amount;
    const updatedPlayer = { ...player, currentXP: newXP };
    
    // Check for level up
    if (newXP >= player.neededXP) {
      updatedPlayer.level += 1;
      updatedPlayer.currentXP = newXP - player.neededXP;
      updatedPlayer.neededXP = Math.floor(player.neededXP * 1.2); // 20% increase per level
    }
    
    setPlayer(updatedPlayer);
  }, [player]);

  const updateHP = useCallback((amount: number) => {
    if (!player) return;
    
    const newHP = Math.max(0, Math.min(player.maxHp, player.hp + amount));
    setPlayer({ ...player, hp: newHP });
  }, [player]);

  const useMana = useCallback((amount: number) => {
    if (!player) return;
    
    const newMP = Math.max(0, player.mp - amount);
    setPlayer({ ...player, mp: newMP });
  }, [player]);

  const value: PlayerContextType = {
    player,
    isLoading,
    loadPlayer,
    createPlayer,
    updatePlayer,
    setRace,
    setClass,
    equipItem,
    useItem,
    addXP,
    updateHP,
    useMana,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};