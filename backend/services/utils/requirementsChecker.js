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
