/**
 * players.js
 * PURPOSE:
 *  - Manage players.json (save/load/update player profiles)
 *
 * ENDPOINTS:
 *  GET /players
 *  GET /players/:id
 *  POST /players
 *      body: { name, gender, raceId, ... } → create profile
 *  PUT /players/:id
 *      → Update state (stats, inventory, spells, skills, abilities, gold, hp/mp, currentStoryNodeId)
 *  DELETE /players/:id
 *
 * GAME-SPECIFIC:
 *  PUT /players/:id/equip
 *      body: { slot, itemId } → Equip/unequip logic, stat aggregation
 */
