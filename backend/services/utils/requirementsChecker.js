/**
 * requirementsChecker.js
 * PURPOSE:
 *  - Utility to check if player meets requirements object
 *  - Requirements can include:
 *      - stats: { statKey: minValue }
 *      - elements: { elementKey: minPercent }
 *      - level: minLevel
 *      - classIds: []
 *      - raceIds: []
 *      - questFlags: []
 *      - items: [{ itemId, qty }]
 *
 * EXPORTS:
 *  - meetsRequirements(player, requirements): boolean
 *
 * USED BY:
 *  - storyService (to hide unavailable choices)
 *  - inventoryService (equip checks)
 *  - class/race selection filtering
 */

function meetsRequirements(player, requirements) {
  if (!requirements) return true;

  // Check level requirement
  if (requirements.level && player.level < requirements.level) {
    return false;
  }

  // Check stat requirements
  if (requirements.stats) {
    for (const [stat, minValue] of Object.entries(requirements.stats)) {
      if ((player.stats[stat] || 0) < minValue) {
        return false;
      }
    }
  }

  // Check element requirements
  if (requirements.elements) {
    for (const [element, minPercent] of Object.entries(requirements.elements)) {
      const playerElement = player.elements?.damage?.[element] || 0;
      if (playerElement < minPercent) {
        return false;
      }
    }
  }

  // Check class requirements
  if (requirements.classIds && requirements.classIds.length > 0) {
    if (!player.classId || !requirements.classIds.includes(player.classId)) {
      return false;
    }
  }

  // Check race requirements
  if (requirements.raceIds && requirements.raceIds.length > 0) {
    if (!player.raceId || !requirements.raceIds.includes(player.raceId)) {
      return false;
    }
  }

  // Check quest flags
  if (requirements.questFlags && requirements.questFlags.length > 0) {
    for (const flag of requirements.questFlags) {
      if (!player.activeQuestState?.[flag]) {
        return false;
      }
    }
  }

  // Check item requirements
  if (requirements.items && requirements.items.length > 0) {
    for (const reqItem of requirements.items) {
      const playerItem = player.inventory.find(item => item.itemId === reqItem.itemId);
      const requiredQty = reqItem.qty || 1;
      if (!playerItem || playerItem.qty < requiredQty) {
        return false;
      }
    }
  }

  return true;
}

module.exports = {
  meetsRequirements
};