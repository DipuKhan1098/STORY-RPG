/**
 * DataContext.tsx
 * PURPOSE:
 *  - Global cache of *static* or semi-static game data (races, classes, items, spells, skills, abilities, monsters, villains, shops).
 *  - Prevents repeated API calls for resources that rarely change during a play session.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Define types based on backend schemas
interface Race {
  id: string;
  name: string;
  description: string;
  baseStats: Record<string, number>;
  elements: {
    damage?: Record<string, number>;
    resistance?: Record<string, number>;
  };
  raceAbilityId?: string | null;
  allowedClasses?: string[];
  asset?: { imageUrl?: string };
}

interface Class {
  id: string;
  name: string;
  description: string;
  baseStats: Record<string, number>;
  elements: {
    damage?: Record<string, number>;
    resistance?: Record<string, number>;
  };
  requirements?: any;
  startingAction?: { type: 'spell' | 'skill'; id: string } | null;
  asset?: { imageUrl?: string };
}

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  slot?: string;
  cost?: number;
  sellValue?: number;
  stackable?: boolean;
  maxStack?: number;
  requirements?: any;
  bonuses?: any;
  potion?: any;
  embedded?: {
    abilities?: string[];
    spells?: string[];
    skills?: string[];
  };
  asset?: { imageUrl?: string };
}

interface Spell {
  id: string;
  name: string;
  description: string;
  type: string;
  targeting: string;
  scaling: { base: number; intMultiplier: number };
  elements?: any[];
  aoe?: any;
  dot?: any;
  summon?: any;
  cost?: { mp?: number; hp?: number; itemId?: string };
  cooldown?: number;
  requirements?: any;
  asset?: { icon?: string };
}

interface Skill {
  id: string;
  name: string;
  description: string;
  type: string;
  targeting: string;
  scaling: { base: number; strMultiplier: number };
  elements?: any[];
  aoe?: any;
  dot?: any;
  cost?: { mp?: number; hp?: number; itemId?: string };
  cooldown?: number;
  requirements?: any;
  asset?: { imageUrl?: string };
}

interface Ability {
  id: string;
  name: string;
  description: string;
  effects: any;
  requirements?: any;
  isRaceAbility?: boolean;
  asset?: { imageUrl?: string };
}

interface Monster {
  id: string;
  name: string;
  description: string;
  baseStats: Record<string, number>;
  elements: {
    damage?: Record<string, number>;
    resistance?: Record<string, number>;
  };
  spells: string[];
  skills: string[];
  abilities: string[];
  loot: {
    xp: number;
    gold: [number, number];
    items: { itemId: string; chance: number; qtyMin?: number; qtyMax?: number }[];
  };
  asset?: { imageUrl?: string };
}

interface Villain {
  id: string;
  name: string;
  description: string;
  baseStats: Record<string, number>;
  elements: {
    damage?: Record<string, number>;
    resistance?: Record<string, number>;
  };
  spells: string[];
  skills: string[];
  abilities: string[];
  equipped: Record<string, string | null>;
  loot: {
    xp: number;
    gold: [number, number];
    items: { itemId: string; chance: number }[];
  };
  asset?: { imageUrl?: string };
}

interface Shop {
  id: string;
  name: string;
  description: string;
  items: { itemId: string; priceOverride?: number }[];
  buyMultiplier: number;
  sellMultiplier: number;
  asset?: { imageUrl?: string };
}

interface DataContextType {
  races: Race[];
  classes: Class[];
  items: Item[];
  spells: Spell[];
  skills: Skill[];
  abilities: Ability[];
  monsters: Monster[];
  villains: Villain[];
  shops: Shop[];
  isLoading: boolean;
  loadAll: () => Promise<void>;
  reload: (type: string) => Promise<void>;
  getById: <T>(type: string, id: string) => T | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  }
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [races, setRaces] = useState<Race[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [villains, setVillains] = useState<Villain[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const fetchData = useCallback(async <T,>(endpoint: string): Promise<T[]> => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  }, [API_BASE_URL]);

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        racesData,
        classesData,
        itemsData,
        spellsData,
        skillsData,
        abilitiesData,
        monstersData,
        villainsData,
        shopsData,
      ] = await Promise.all([
        fetchData<Race>('races'),
        fetchData<Class>('classes'),
        fetchData<Item>('items'),
        fetchData<Spell>('spells'),
        fetchData<Skill>('skills'),
        fetchData<Ability>('abilities'),
        fetchData<Monster>('monsters'),
        fetchData<Villain>('villains'),
        fetchData<Shop>('shops'),
      ]);

      setRaces(racesData);
      setClasses(classesData);
      setItems(itemsData);
      setSpells(spellsData);
      setSkills(skillsData);
      setAbilities(abilitiesData);
      setMonsters(monstersData);
      setVillains(villainsData);
      setShops(shopsData);
    } catch (error) {
      console.error('Failed to load game data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  const reload = useCallback(async (type: string) => {
    try {
      switch (type) {
        case 'races':
          setRaces(await fetchData<Race>('races'));
          break;
        case 'classes':
          setClasses(await fetchData<Class>('classes'));
          break;
        case 'items':
          setItems(await fetchData<Item>('items'));
          break;
        case 'spells':
          setSpells(await fetchData<Spell>('spells'));
          break;
        case 'skills':
          setSkills(await fetchData<Skill>('skills'));
          break;
        case 'abilities':
          setAbilities(await fetchData<Ability>('abilities'));
          break;
        case 'monsters':
          setMonsters(await fetchData<Monster>('monsters'));
          break;
        case 'villains':
          setVillains(await fetchData<Villain>('villains'));
          break;
        case 'shops':
          setShops(await fetchData<Shop>('shops'));
          break;
        default:
          throw new Error(`Unknown data type: ${type}`);
      }
    } catch (error) {
      console.error(`Failed to reload ${type}:`, error);
      throw error;
    }
  }, [fetchData]);

  const getById = useCallback(<T,>(type: string, id: string): T | undefined => {
    let collection: any[];
    switch (type) {
      case 'races':
        collection = races;
        break;
      case 'classes':
        collection = classes;
        break;
      case 'items':
        collection = items;
        break;
      case 'spells':
        collection = spells;
        break;
      case 'skills':
        collection = skills;
        break;
      case 'abilities':
        collection = abilities;
        break;
      case 'monsters':
        collection = monsters;
        break;
      case 'villains':
        collection = villains;
        break;
      case 'shops':
        collection = shops;
        break;
      default:
        return undefined;
    }
    return collection.find(item => item.id === id) as T;
  }, [races, classes, items, spells, skills, abilities, monsters, villains, shops]);

  // Load data on mount
  useEffect(() => {
    loadAll().catch(error => {
      console.error('Failed to load initial game data:', error);
    });
  }, [loadAll]);

  const value: DataContextType = {
    races,
    classes,
    items,
    spells,
    skills,
    abilities,
    monsters,
    villains,
    shops,
    isLoading,
    loadAll,
    reload,
    getById,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
  )
}