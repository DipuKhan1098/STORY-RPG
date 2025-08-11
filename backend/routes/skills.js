/**
 * skills.js
 * PURPOSE:
 *  - Manage physical skills scaling on STR (plus DEX for some).
 *  - CRUD for skills.json
 *  - Game uses for:
 *      - Battle UI
 *      - Skill unlocks every 20 levels
 *      - Item embedded skills
 *
 * ENDPOINTS: same pattern as spells
 * VALIDATIONS:
 *  - scaling.strMultiplier >= 0
 *  - Element keys valid
 *  - AoE and DoT valid only for 'damage' type
 */

const express = require('express');
const router = express.Router();
const fileService = require('../services/fileService');
const { generateId } = require('../services/utils/idGenerator');
const { isValidElement } = require('../services/utils/elementTables');

const VALID_TYPES = ['damage', 'buff', 'debuff', 'mixed'];
const VALID_TARGETING = ['single', 'aoe', 'self'];

// Validation helper
function validateSkill(skill) {
  const errors = [];

  if (!skill.name || typeof skill.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (!skill.description || typeof skill.description !== 'string') {
    errors.push('Description is required and must be a string');
  }

  if (!skill.type || !VALID_TYPES.includes(skill.type)) {
    errors.push(`Type must be one of: ${VALID_TYPES.join(', ')}`);
  }

  if (!skill.targeting || !VALID_TARGETING.includes(skill.targeting)) {
    errors.push(`Targeting must be one of: ${VALID_TARGETING.join(', ')}`);
  }

  if (!skill.scaling || typeof skill.scaling.base !== 'number' || typeof skill.scaling.strMultiplier !== 'number') {
    errors.push('Scaling must have numeric base and strMultiplier');
  }

  if (skill.scaling && skill.scaling.strMultiplier < 0) {
    errors.push('strMultiplier must be >= 0');
  }

  if (skill.elements && Array.isArray(skill.elements)) {
    for (const element of skill.elements) {
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
  if (skill.dot && !['damage', 'mixed'].includes(skill.type)) {
    errors.push('DoT effects only allowed for damage or mixed type skills');
  }

  if (skill.dot) {
    if (typeof skill.dot.ticks !== 'number' || skill.dot.ticks <= 0) {
      errors.push('DoT ticks must be a positive number');
    }
  }

  // AoE validation
  if (skill.aoe && !['damage', 'mixed'].includes(skill.type)) {
    errors.push('AoE effects only allowed for damage or mixed type skills');
  }

  return errors;
}

// GET /skills - List all skills
router.get('/', async (req, res, next) => {
  try {
    const skills = await fileService.readJSON('skills.json');
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

// GET /skills/:id - Get single skill
router.get('/:id', async (req, res, next) => {
  try {
    const skills = await fileService.readJSON('skills.json');
    const skill = skills.find(s => s.id === req.params.id);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    next(error);
  }
});

// POST /skills - Create new skill (admin only)
router.post('/', async (req, res, next) => {
  try {
    const validationErrors = validateSkill(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const skills = await fileService.readJSON('skills.json');
    
    // Check for duplicate name
    if (skills.find(s => s.name === req.body.name)) {
      return res.status(400).json({ error: 'Skill name must be unique' });
    }

    const newSkill = {
      id: generateId('skl'),
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      targeting: req.body.targeting,
      scaling: req.body.scaling,
      elements: req.body.elements || [],
      aoe: req.body.aoe,
      dot: req.body.dot,
      cost: req.body.cost || {},
      cooldown: req.body.cooldown || 0,
      requirements: req.body.requirements || {},
      asset: req.body.asset
    };

    skills.push(newSkill);
    await fileService.writeJSON('skills.json', skills);
    
    res.status(201).json(newSkill);
  } catch (error) {
    next(error);
  }
});

// PUT /skills/:id - Update skill (admin only)
router.put('/:id', async (req, res, next) => {
  try {
    const validationErrors = validateSkill(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const updatedSkills = await fileService.updateJSON('skills.json', (skills) => {
      const index = skills.findIndex(s => s.id === req.params.id);
      if (index === -1) {
        throw new Error('Skill not found');
      }

      // Check for duplicate name (excluding current skill)
      if (skills.find(s => s.name === req.body.name && s.id !== req.params.id)) {
        throw new Error('Skill name must be unique');
      }

      skills[index] = {
        ...skills[index],
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        targeting: req.body.targeting,
        scaling: req.body.scaling,
        elements: req.body.elements || [],
        aoe: req.body.aoe,
        dot: req.body.dot,
        cost: req.body.cost || {},
        cooldown: req.body.cooldown || 0,
        requirements: req.body.requirements || {},
        asset: req.body.asset
      };

      return skills;
    });

    const updatedSkill = updatedSkills.find(s => s.id === req.params.id);
    res.json(updatedSkill);
  } catch (error) {
    if (error.message === 'Skill not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Skill name must be unique') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE /skills/:id - Delete skill (admin only)
router.delete('/:id', async (req, res, next) => {
  try {
    await fileService.updateJSON('skills.json', (skills) => {
      const index = skills.findIndex(s => s.id === req.params.id);
      if (index === -1) {
        throw new Error('Skill not found');
      }
      skills.splice(index, 1);
      return skills;
    });

    res.status(204).send();
  } catch (error) {
    if (error.message === 'Skill not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;