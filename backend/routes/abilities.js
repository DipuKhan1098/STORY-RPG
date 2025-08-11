/**
 * abilities.js
 * PURPOSE:
 *  - Manage passive abilities (permanent bonuses).
 *  - Used by Admin to CRUD abilities and by Game to fetch ability data for display in:
 *    - Race selection (innate abilities)
 *    - Class selection
 *    - Item embedded abilities
 *    - Player profile (learned abilities list)
 *
 * ENDPOINTS:
 *  GET /abilities
 *      → Returns array of all abilities from abilities.json.
 *  GET /abilities/:id
 *      → Returns single ability by id.
 *  POST /abilities
 *      body: { name, description, effects, requirements, isRaceAbility }
 *      → Creates new ability with unique id.
 *  PUT /abilities/:id
 *      → Updates existing ability; validates effects structure and ranges.
 *  DELETE /abilities/:id
 *      → Removes ability from abilities.json; also should trigger cleanup in races, classes, items.
 *
 * VALIDATIONS:
 *  - Name required, unique
 *  - effects.stats: only allowed keys (str,int,wis,end,dex,agi,luck,char)
 *  - elemental.offense/defense keys must be from 12-element list
 *  - Multipliers, regen, crit, escape values clamped to safe ranges
 *
 * USED BY:
 *  - Admin: Ability Editor
 *  - Game: Player stat aggregation, requirements checking
 */

const express = require('express');
const router = express.Router();
const fileService = require('../services/fileService');
const { generateId } = require('../services/utils/idGenerator');
const { isValidElement } = require('../services/utils/elementTables');

const VALID_STATS = ['str', 'int', 'wis', 'end', 'dex', 'agi', 'luck', 'char'];

// Validation helper
function validateAbility(ability) {
  const errors = [];

  if (!ability.name || typeof ability.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (!ability.description || typeof ability.description !== 'string') {
    errors.push('Description is required and must be a string');
  }

  if (ability.effects) {
    // Validate stats
    if (ability.effects.stats) {
      for (const stat of Object.keys(ability.effects.stats)) {
        if (!VALID_STATS.includes(stat)) {
          errors.push(`Invalid stat key: ${stat}`);
        }
      }
    }

    // Validate elemental keys
    if (ability.effects.elemental) {
      if (ability.effects.elemental.offense) {
        for (const element of Object.keys(ability.effects.elemental.offense)) {
          if (!isValidElement(element)) {
            errors.push(`Invalid element key in offense: ${element}`);
          }
        }
      }
      if (ability.effects.elemental.defense) {
        for (const element of Object.keys(ability.effects.elemental.defense)) {
          if (!isValidElement(element)) {
            errors.push(`Invalid element key in defense: ${element}`);
          }
        }
      }
    }

    // Validate multipliers ranges
    if (ability.effects.multipliers) {
      const multipliers = ability.effects.multipliers;
      for (const [key, value] of Object.entries(multipliers)) {
        if (typeof value !== 'number' || value < -100 || value > 100) {
          errors.push(`Multiplier ${key} must be a number between -100 and 100`);
        }
      }
    }

    // Validate crit and escape ranges
    if (ability.effects.crit) {
      if (ability.effects.crit.base && (ability.effects.crit.base < 0 || ability.effects.crit.base > 100)) {
        errors.push('Crit base must be between 0 and 100');
      }
    }
    if (ability.effects.escape) {
      if (ability.effects.escape.base && (ability.effects.escape.base < 5 || ability.effects.escape.base > 95)) {
        errors.push('Escape base must be between 5 and 95');
      }
    }
  }

  return errors;
}

// GET /abilities - List all abilities
router.get('/', async (req, res, next) => {
  try {
    const abilities = await fileService.readJSON('abilities.json');
    res.json(abilities);
  } catch (error) {
    next(error);
  }
});

// GET /abilities/:id - Get single ability
router.get('/:id', async (req, res, next) => {
  try {
    const abilities = await fileService.readJSON('abilities.json');
    const ability = abilities.find(a => a.id === req.params.id);
    
    if (!ability) {
      return res.status(404).json({ error: 'Ability not found' });
    }
    
    res.json(ability);
  } catch (error) {
    next(error);
  }
});

// POST /abilities - Create new ability (admin only)
router.post('/', async (req, res, next) => {
  try {
    const validationErrors = validateAbility(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const abilities = await fileService.readJSON('abilities.json');
    
    // Check for duplicate name
    if (abilities.find(a => a.name === req.body.name)) {
      return res.status(400).json({ error: 'Ability name must be unique' });
    }

    const newAbility = {
      id: generateId('abl'),
      name: req.body.name,
      description: req.body.description,
      effects: req.body.effects || {},
      requirements: req.body.requirements || {},
      isRaceAbility: req.body.isRaceAbility || false
    };

    abilities.push(newAbility);
    await fileService.writeJSON('abilities.json', abilities);
    
    res.status(201).json(newAbility);
  } catch (error) {
    next(error);
  }
});

// PUT /abilities/:id - Update ability (admin only)
router.put('/:id', async (req, res, next) => {
  try {
    const validationErrors = validateAbility(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const updatedAbilities = await fileService.updateJSON('abilities.json', (abilities) => {
      const index = abilities.findIndex(a => a.id === req.params.id);
      if (index === -1) {
        throw new Error('Ability not found');
      }

      // Check for duplicate name (excluding current ability)
      if (abilities.find(a => a.name === req.body.name && a.id !== req.params.id)) {
        throw new Error('Ability name must be unique');
      }

      abilities[index] = {
        ...abilities[index],
        name: req.body.name,
        description: req.body.description,
        effects: req.body.effects || {},
        requirements: req.body.requirements || {},
        isRaceAbility: req.body.isRaceAbility || false
      };

      return abilities;
    });

    const updatedAbility = updatedAbilities.find(a => a.id === req.params.id);
    res.json(updatedAbility);
  } catch (error) {
    if (error.message === 'Ability not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Ability name must be unique') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE /abilities/:id - Delete ability (admin only)
router.delete('/:id', async (req, res, next) => {
  try {
    await fileService.updateJSON('abilities.json', (abilities) => {
      const index = abilities.findIndex(a => a.id === req.params.id);
      if (index === -1) {
        throw new Error('Ability not found');
      }
      abilities.splice(index, 1);
      return abilities;
    });

    res.status(204).send();
  } catch (error) {
    if (error.message === 'Ability not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;