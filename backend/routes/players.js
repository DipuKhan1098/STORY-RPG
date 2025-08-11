/**
 * players.js
 * PURPOSE:
 *  - Manage players.json (save/load/update player profiles)
 *
 * ENDPOINTS:
 *  GET /players
 *  GET /players/:id
 *  POST /players
 *      body: { name, gender, ... } → create profile
 *  PUT /players/:id
 *      → Update state (stats, inventory, spells, skills, abilities, gold, hp/mp, currentStoryNodeId)
 *  DELETE /players/:id
 *
 * GAME-SPECIFIC:
 *  PUT /players/:id/equip
 *      body: { slot, itemId } → Equip/unequip logic, stat aggregation
 */

const express = require('express');
const router = express.Router();
const fileService = require('../services/fileService');
const { generateId } = require('../services/utils/idGenerator');

// Helper to calculate derived stats
function calculateDerivedStats(player) {
  const maxHp = player.stats.end * 10;
  const maxMp = player.stats.wis * 10;
  
  return {
    maxHp,
    maxMp,
    // Ensure current HP/MP don't exceed max
    hp: Math.min(player.hp || maxHp, maxHp),
    mp: Math.min(player.mp || maxMp, maxMp)
  };
}

// GET /players - List all players
router.get('/', async (req, res, next) => {
  try {
    const players = await fileService.readJSON('players.json');
    // Return basic info only for listing
    const playerList = players.map(p => ({
      id: p.id,
      name: p.name,
      gender: p.gender,
      level: p.level,
      raceId: p.raceId,
      classId: p.classId,
      currentStoryNodeId: p.currentStoryNodeId
    }));
    res.json(playerList);
  } catch (error) {
    next(error);
  }
});

// GET /players/:id - Get single player
router.get('/:id', async (req, res, next) => {
  try {
    const players = await fileService.readJSON('players.json');
    const player = players.find(p => p.id === req.params.id);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// POST /players - Create new player
router.post('/', async (req, res, next) => {
  try {
    const { name, gender } = req.body;
    
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    
    if (!gender || !['male', 'female'].includes(gender)) {
      return res.status(400).json({ error: 'Gender must be "male" or "female"' });
    }

    const players = await fileService.readJSON('players.json');
    
    // Check for duplicate name
    if (players.find(p => p.name === name)) {
      return res.status(400).json({ error: 'Player name must be unique' });
    }

    const newPlayer = {
      id: generateId('ply'),
      name,
      gender,
      raceId: null,
      classId: null,
      level: 1,
      currentXP: 0,
      neededXP: 100,
      hp: 20,
      maxHp: 20,
      mp: 20,
      maxMp: 20,
      stats: { str: 1, int: 1, wis: 1, end: 1, dex: 1, agi: 1, luck: 1, char: 1 },
      elements: { damage: {}, resistance: {} },
      spells: [],
      skills: [],
      abilities: [],
      inventory: [],
      equipped: {
        head: null,
        body: null,
        leg: null,
        shoe: null,
        mainWeapon: null,
        offWeapon: null,
        ringLeft: null,
        ringRight: null,
        necklace: null,
        potion1: null,
        potion2: null
      },
      gold: 25,
      currentStoryNodeId: null,
      activeQuestState: {},
      summons: []
    };

    players.push(newPlayer);
    await fileService.writeJSON('players.json', players);
    
    res.status(201).json(newPlayer);
  } catch (error) {
    next(error);
  }
});

// PUT /players/:id - Update player
router.put('/:id', async (req, res, next) => {
  try {
    const updatedPlayers = await fileService.updateJSON('players.json', (players) => {
      const index = players.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        throw new Error('Player not found');
      }

      // Merge updates
      const updatedPlayer = { ...players[index], ...req.body };
      
      // Recalculate derived stats if stats changed
      if (req.body.stats) {
        const derived = calculateDerivedStats(updatedPlayer);
        updatedPlayer.maxHp = derived.maxHp;
        updatedPlayer.maxMp = derived.maxMp;
        updatedPlayer.hp = derived.hp;
        updatedPlayer.mp = derived.mp;
      }

      players[index] = updatedPlayer;
      return players;
    });

    const updatedPlayer = updatedPlayers.find(p => p.id === req.params.id);
    res.json(updatedPlayer);
  } catch (error) {
    if (error.message === 'Player not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

// PUT /players/:id/equip - Equip/unequip item
router.put('/:id/equip', async (req, res, next) => {
  try {
    const { slot, itemId } = req.body;
    
    if (!slot) {
      return res.status(400).json({ error: 'Slot is required' });
    }

    const validSlots = ['head', 'body', 'leg', 'shoe', 'mainWeapon', 'offWeapon', 'ringLeft', 'ringRight', 'necklace', 'potion1', 'potion2'];
    if (!validSlots.includes(slot)) {
      return res.status(400).json({ error: 'Invalid slot' });
    }

    // If itemId provided, validate it exists and player has it
    if (itemId) {
      try {
        const items = await fileService.readJSON('items.json');
        const item = items.find(i => i.id === itemId);
        if (!item) {
          return res.status(400).json({ error: 'Item not found' });
        }
      } catch (error) {
        return res.status(400).json({ error: 'Items data not available' });
      }
    }

    const updatedPlayers = await fileService.updateJSON('players.json', (players) => {
      const index = players.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        throw new Error('Player not found');
      }

      const player = players[index];
      
      // For potions, handle stack quantities
      if (slot.startsWith('potion')) {
        if (itemId) {
          const inventoryItem = player.inventory.find(i => i.itemId === itemId);
          if (!inventoryItem || inventoryItem.qty <= 0) {
            throw new Error('Item not in inventory or insufficient quantity');
          }
          player.equipped[slot] = { itemId, qty: inventoryItem.qty };
        } else {
          player.equipped[slot] = null;
        }
      } else {
        // Regular equipment
        if (itemId) {
          const inventoryItem = player.inventory.find(i => i.itemId === itemId);
          if (!inventoryItem || inventoryItem.qty <= 0) {
            throw new Error('Item not in inventory');
          }
        }
        player.equipped[slot] = itemId;
      }

      players[index] = player;
      return players;
    });

    const updatedPlayer = updatedPlayers.find(p => p.id === req.params.id);
    res.json(updatedPlayer);
  } catch (error) {
    if (error.message === 'Player not found' || error.message.includes('not in inventory')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE /players/:id - Delete player
router.delete('/:id', async (req, res, next) => {
  try {
    await fileService.updateJSON('players.json', (players) => {
      const index = players.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        throw new Error('Player not found');
      }
      players.splice(index, 1);
      return players;
    });

    res.status(204).send();
  } catch (error) {
    if (error.message === 'Player not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;