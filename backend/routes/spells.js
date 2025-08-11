/**
 * spells.js
 * PURPOSE:
 *  - Manage magical abilities scaling on INT.
 *  - CRUD for spells.json
 *  - Game fetches spells for:
 *      - Battle UI
 *      - Spell selection on level-up (every 5 levels)
 *      - Item embedded spells
 *
 * ENDPOINTS:
 *  GET /spells
 *  GET /spells/:id
 *  POST /spells
 *      body: { name, description, type, targeting, scaling, elements, cost, cooldown, requirements }
 *  PUT /spells/:id
 *  DELETE /spells/:id
 *
 * VALIDATIONS:
 *  - Type must be one of 'damage','heal','summon','buff','debuff','mixed'
 *  - scaling.intMultiplier >= 0
 *  - Element keys from fixed list; fixed damage and multipliers numeric
 *  - DoT fields only for types that support it
 *  - Summon.monsterId must exist in monsters.json
 */

const express = require('express');
const router = express.Router();
const fileService = require('../services/fileService');
const { generateId } = require('../services/utils/idGenerator');
const { isValidElement } = require('../services/utils/elementTables');

const VALID_TYPES = ['damage', 'heal', 'summon', 'buff', 'debuff', 'mixed'];
const VALID_TARGETING = ['single', 'aoe', 'self'];

// Validation helper
function validateSpell(spell) {
  const errors = [];

  if (!spell.name || typeof spell.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (!spell.description || typeof spell.description !== 'string') {
    errors.push('Description is required and must be a string');
  }

  if (!spell.type || !VALID_TYPES.includes(spell.type)) {
    errors.push(`Type must be one of: ${VALID_TYPES.join(', ')}`);
  }

  if (!spell.targeting || !VALID_TARGETING.includes(spell.targeting)) {
    errors.push(`Targeting must be one of: ${VALID_TARGETING.join(', ')}`);
  }

  if (!spell.scaling || typeof spell.scaling.base !== 'number' || typeof spell.scaling.intMultiplier !== 'number') {
    errors.push('Scaling must have numeric base and intMultiplier');
  }

  if (spell.scaling && spell.scaling.intMultiplier < 0) {
    errors.push('intMultiplier must be >= 0');
  }

  if (spell.elements && Array.isArray(spell.elements)) {
    for (const element of spell.elements) {
      if (!element.key || !isValidElement(element.key)) {
        errors.push(`Invalid element key: ${element.key}`);
      }
      if (element.fixed !== undefined && typeof element.fixed !== 'number') {
        errors.push('Element fixed value must be numeric');
      }
      if (element.mult !== undefined && typeof element.mult !== 'number') {
        errors.push('Element mult value must be numeric');
      }
    }
  }

  // DoT validation
  if (spell.dot && !['damage', 'mixed'].includes(spell.type)) {
    errors.push('DoT effects only allowed for damage or mixed type spells');
  }

  if (spell.dot) {
    if (typeof spell.dot.ticks !== 'number' || spell.dot.ticks <= 0) {
      errors.push('DoT ticks must be a positive number');
    }
  }

  // Summon validation
  if (spell.summon && spell.type !== 'summon') {
    errors.push('Summon effects only allowed for summon type spells');
  }

  if (spell.summon && !spell.summon.monsterId) {
    errors.push('Summon must specify monsterId');
  }

  return errors;
}

// GET /spells - List all spells
router.get('/', async (req, res, next) => {
  try {
    const spells = await fileService.readJSON('spells.json');
    res.json(spells);
  } catch (error) {
    next(error);
  }
});

// GET /spells/:id - Get single spell
router.get('/:id', async (req, res, next) => {
  try {
    const spells = await fileService.readJSON('spells.json');
    const spell = spells.find(s => s.id === req.params.id);
    
    if (!spell) {
      return res.status(404).json({ error: 'Spell not found' });
    }
    
    res.json(spell);
  } catch (error) {
    next(error);
  }
});

// POST /spells - Create new spell (admin only)
router.post('/', async (req, res, next) => {
  try {
    const validationErrors = validateSpell(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    // Validate summon monsterId exists if specified
    if (req.body.summon && req.body.summon.monsterId) {
      try {
        const monsters = await fileService.readJSON('monsters.json');
        if (!monsters.find(m => m.id === req.body.summon.monsterId)) {
          return res.status(400).json({ error: 'Summon monsterId does not exist' });
        }
      } catch (error) {
        // monsters.json might not exist yet, allow creation
      }
    }

    const spells = await fileService.readJSON('spells.json');
    
    // Check for duplicate name
    if (spells.find(s => s.name === req.body.name)) {
      return res.status(400).json({ error: 'Spell name must be unique' });
    }

    const newSpell = {
      id: generateId('spl'),
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      targeting: req.body.targeting,
      scaling: req.body.scaling,
      elements: req.body.elements || [],
      aoe: req.body.aoe,
      dot: req.body.dot,
      summon: req.body.summon,
      cost: req.body.cost || {},
      cooldown: req.body.cooldown || 0,
      requirements: req.body.requirements || {},
      asset: req.body.asset
    };

    spells.push(newSpell);
    await fileService.writeJSON('spells.json', spells);
    
    res.status(201).json(newSpell);
  } catch (error) {
    next(error);
  }
});

// PUT /spells/:id - Update spell (admin only)
router.put('/:id', async (req, res, next) => {
  try {
    const validationErrors = validateSpell(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    // Validate summon monsterId exists if specified
    if (req.body.summon && req.body.summon.monsterId) {
      try {
        const monsters = await fileService.readJSON('monsters.json');
        if (!monsters.find(m => m.id === req.body.summon.monsterId)) {
          return res.status(400).json({ error: 'Summon monsterId does not exist' });
        }
      } catch (error) {
        // monsters.json might not exist yet, allow update
      }
    }

    const updatedSpells = await fileService.updateJSON('spells.json', (spells) => {
      const index = spells.findIndex(s => s.id === req.params.id);
      if (index === -1) {
        throw new Error('Spell not found');
      }

      // Check for duplicate name (excluding current spell)
      if (spells.find(s => s.name === req.body.name && s.id !== req.params.id)) {
        throw new Error('Spell name must be unique');
      }

      spells[index] = {
        ...spells[index],
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        targeting: req.body.targeting,
        scaling: req.body.scaling,
        elements: req.body.elements || [],
        aoe: req.body.aoe,
        dot: req.body.dot,
        summon: req.body.summon,
        cost: req.body.cost || {},
        cooldown: req.body.cooldown || 0,
        requirements: req.body.requirements || {},
        asset: req.body.asset
      };

      return spells;
    });

    const updatedSpell = updatedSpells.find(s => s.id === req.params.id);
    res.json(updatedSpell);
  } catch (error) {
    if (error.message === 'Spell not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Spell name must be unique') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE /spells/:id - Delete spell (admin only)
router.delete('/:id', async (req, res, next) => {
  try {
    await fileService.updateJSON('spells.json', (spells) => {
      const index = spells.findIndex(s => s.id === req.params.id);
      if (index === -1) {
        throw new Error('Spell not found');
      }
      spells.splice(index, 1);
      return spells;
    });

    res.status(204).send();
  } catch (error) {
    if (error.message === 'Spell not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;