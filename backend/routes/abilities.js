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
