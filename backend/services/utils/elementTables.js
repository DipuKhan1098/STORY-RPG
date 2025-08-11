/**
 * elementTables.js
 * PURPOSE:
 *  - Master list of valid elements and any static relationships
 *  - Elements: fire, water, earth, air, wood, metal, light, darkness, life, death, time, space
 *  - Could define:
 *      - default resistances
 *      - advantage/disadvantage multipliers
 *      - color/icon asset paths
 *
 * EXPORTS:
 *  - ELEMENTS: string[]
 *  - getElementIndex(key): number
 */

const ELEMENTS = [
  'fire', 'water', 'earth', 'air', 'wood', 'metal',
  'light', 'darkness', 'life', 'death', 'time', 'space'
];

function getElementIndex(key) {
  return ELEMENTS.indexOf(key);
}

function isValidElement(key) {
  return ELEMENTS.includes(key);
}

// Element color mappings for UI
const ELEMENT_COLORS = {
  fire: '#ff4444',
  water: '#4488ff',
  earth: '#8b4513',
  air: '#87ceeb',
  wood: '#228b22',
  metal: '#c0c0c0',
  light: '#ffff99',
  darkness: '#4b0082',
  life: '#90ee90',
  death: '#800080',
  time: '#ffd700',
  space: '#9370db'
};

module.exports = {
  ELEMENTS,
  getElementIndex,
  isValidElement,
  ELEMENT_COLORS
};